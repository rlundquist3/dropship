var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var net = require('net')
var jsonSocket = require('json-socket');

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

var http = require('http')
http.createServer(app).listen(PORT, HOST)
console.log('HTTP server listening on %s:%s', HOST, PORT)

var nodeCouchDB = require('node-couchdb')
var couch = new nodeCouchDB('localhost', 5984)

app.use(express.static(__dirname + '/design/layout/'))
app.set('views', path.join(__dirname + '/design/layout/'))
app.set('view engine', 'rtl')

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
	//res.render('design/layout/index.html')
	res.sendFile(path.join(__dirname + '/design/layout/index.html'))
})

var companyName = 'testcompany'

app.get('/testcompany', function(req, res) {
	//res.render('retailers', {companyName: 'test company'})
	res.sendFile(path.join(__dirname + '/design/layout/retailers.html'))
})

//
