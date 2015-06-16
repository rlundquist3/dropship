var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var swig = require('swig')
var http = require('http')
var bodyParser = require('body-parser')
var multer = require('multer')
var util = require('util')
var db = require('./data/db.js')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var cookieParser = require('cookie-parser')
var companyData = require('./data/testData.js')

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

app.use(session({
	secret: 'turtlesoup',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

var User = require('./data/user.js')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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

app.post('/signup', function(req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, account) {
		if (err)
			throw err

		passport.authenticate('local')(req, res, function() {
			res.redirect('/user_test')
		})
	})
})

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/user_test')
})

app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

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
			io.emit(util.format('%s_data', tab), data)
		})
	}
}
