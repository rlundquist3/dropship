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

http.createServer(app).listen(PORT, HOST)
console.log('HTTP server listening on %s:%s', HOST, PORT)

var couch = new nodeCouchDB('localhost', 5984)

/*var uploads = require('./routes/uploads')
app.use('/uploads', uploads)*/

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
		console.log('upload of ' + file.orginalname + ' started...')
	},
	onFileUploadComplete: function(file) {
		console.log(file.fieldname + ' saved as ' + file.path)
		uploadDone = true
	}
}))

/*
var JSONPORT = 8001
var messageServer = net.createServer()
messageServer.listen(JSONPORT)
messageServer.on('connection', function(socket) {
	socket = new JsonSocket(socket)
	socket.on('message', function(message) {
		console.log(message)
		socket.sendEndMessage({response: 'soup'})
	})
})
*/

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/testcompany', function(req, res) {
	res.render('retailers', {company_name: 'company name'})
})

app.post('/uploadFile', function(req, res) {
	if (uploadDone) {
		console.log(req.files)
		//Figure out upload status updating
		res.redirect('back')

		for (var key in req.files) {
			if (req.files.hasOwnProperty(key)) {
				var file = req.files[key]
				switch (file.name.split('_')[0]) {
					case 'products':
						insertProducts(file)
						break;
					case 'inventory':
						insertInventory(file)
						break;
					case 'purchaseorder':
						insertPurchaseOrder(file)
						break;
					case 'orderstatus':
						insertOrderStatus(file)
						break;
					case 'ordertracking':
						insertOrderTracking(file)
						break;
					case 'invoices':
						insertInvoices(file)
						break;
					case 'suppliers':
						insertSuppliers(file)
						break;
					case 'retailers':
						insertRetailers(file)
						break;
					default:
						console.log('Upload type failed to match')
				}
			}
		}
	}
})

function insertProducts(file) {
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

			/*couch.insert(type, data, function(err, resData) {
				if (err)
					return console.error(err)

				console.dir(resData)
			})*/
		})
		.on('end', function() {
			console.log('stream done')
		})
}
