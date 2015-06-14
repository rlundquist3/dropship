var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var swig = require('swig')
var http = require('http')
var bodyParser = require('body-parser')
var multer = require('multer')
var util = require('util')
var db = require('./db.js')
var passport = require('passport')

/*
var https = require('https')
var options = {
	key: fs.readFileSync('dropship-key.pem')
	cert: fs.readFileSync('dropship-cert.pem')
}
var server = https.createServer(options, app).listen(PORT, HOST)
console.log('HTTPS server listening on %s:%s', HOST, PORT)
*/

var PORT = 8000
var HOST = 'localhost'

var server = http.createServer(app).listen(PORT, HOST)
console.log('HTTP server listening on %s:%s', HOST, PORT)

require('./passport.js')(passport)

var io = require('socket.io')(server)

var tabs = ['products',
			'inventory'/*,
			'orders',
			'partners',
			'profile'*/]

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.use(express.static(__dirname + '/design/layout/'))
app.set('views', __dirname + '/design/layout/')

var uploadDone = false
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use(multer({
	dest: './uploads/',
	rename: function(fieldname, filename, req) {
		return (req.body.uploadType + '_' + filename + '_' + Date.now()).replace(' ', '').toLowerCase()
	},
	onFileUploadStart: function(file) {
		console.log('upload of started...')
	},
	onFileUploadComplete: function(file) {
		console.log(file.fieldname + ' saved as ' + file.path)
		db.insertIntoDB(file.name.split('_')[0], file)
		uploadDone = true
	}
}))

io.on('connection', function(socket) {
	console.log('socket connection')
	socket.on('get_company_data', function(socket) {
		console.log('company data request')
		loadCompanyData()
	})
	socket.on('product_confirm', function(data) {
		console.log(data)
	})
	socket.on('inventory_confirm', function(data) {
		console.log(data)
	})
})

app.get('/', function(req, res) {
	res.render('index')
})

app.post('/signup', passport.authenticate('local-signup', {
	successRedirect: util.format('/user_%s', name),
	failureRedirect: '/signup'
	failureFlash: true
}))

app.post('/login', passport.authenticate('local-login', {
	successRedirect: util.format('/user_%s', name),
	failureRedirect: '/login'
	failureFlash: true
}))

var name = 'test'
app.get(util.format('/user_%s', name), function(req, res) {
	res.render('retailers', {company_name: 'company name'})
})

app.post('/uploadFile', function(req, res) {
	if (uploadDone) {
		res.redirect('back')
	}
})

function loadCompanyData() {
	for (var tab of tabs) {
		var query = util.format('_design/%s/_view/all_%s', tab, tab)
		console.log(query)

		db.getFromDB(tab, query, function(err, tab, data) {
			if (err)
				throw err
			console.log('callback')
			console.log(data)
			io.emit(util.format('%s_data', tab), data)
		})
	}
}
