var net = require('net')
var jsonSocket = require('json-socket')

var JSONPORT = 8001
var HOST = 'localhost'

document.on('ready', function() {
var socket = new JsonSocket(new net.Socket())
socket.connect(port, host)
socket.on('connect' function() {
	socket.sendMessage({request: 'turtle'})
	socket.on('message', function(message) {
		console.log(message)
	})
})
})
