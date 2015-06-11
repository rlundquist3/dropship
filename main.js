var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var swig = require('swig')
var http = require('http')
var nodeCouchDB = require('node-couchdb')
var bodyParser = require('body-parser')
var multer = require('multer')
var csv = require('fast-csv')
var uuid = require('uuid')

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

var couch = new nodeCouchDB('localhost', 5984)

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.use(express.static(__dirname + '/design/layout/'))
app.set('views', __dirname + '/design/layout/')

var uploadDone = false
app.use(bodyParser.urlencoded({extended: false}))
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
		insertIntoDB(file.name.split('_')[0], file)
		uploadDone = true
	}
}))

io.on('connection', function(socket) {
	console.log('socket connection')
	socket.emit('server_emit', {hello: 'world'})
	socket.on('client_emit', function(data) {
		console.log(data)
	})
})

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/testcompany', function(req, res) {
	res.render('retailers', {company_name: 'company name'})
})

app.post('/uploadFile', function(req, res) {
	if (uploadDone) {
		res.redirect('back')
	}
})

app.get('/products', function(req, res) {
	res.render('products')
})

function insertIntoDB(dataType, file) {
	var stream = fs.createReadStream(file.path, {headers: true})
	var headers
	csv
		.fromStream(stream)
		.transform(function(data) {
			if (headers) {
				var id = uuid.v1()
				var paired = {}
				paired._id = id
				for (var i = 0; i<data.length; i++)
					paired[headers[i]] = data[i]
				return paired
			} else {
				headers = data
				return
			}
		})
		.on('data', function(data) {
			console.log(data)

			couch.insert(dataType, data, function(err, resData) {
				if (err)
					return console.error(err)

				console.dir(resData)
			})
		})
		.on('end', function() {
			console.log('stream done')
		})
}
