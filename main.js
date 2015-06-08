var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')

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
//app.set('view engine', 'jade')

app.get('/', function(req, res) {
	//res.render('design/layout/index.html')
	res.sendFile(path.join(__dirname + '/design/layout/index.html'))
})

app.get('/retailer', function(req, res) {
	//res.render('design/layout/retailers')
	res.sendFile(path.join(__dirname + '/design/layout/retailers.html'))
})

