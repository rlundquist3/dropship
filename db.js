var fs = require('fs')
var csv = require('fast-csv')
var TestData = require('./companyData.js')
var uuid = require('uuid')
var nodeCouchDB = require('node-couchdb')

var couch = new nodeCouchDB('localhost', 5984)

var db = function() {

}

db.prototype.getFromDB = function(type, query, callback) {
	couch.get(type, query, function(err, resData) {
		if (err)
			return console.error(err)
		callback(null, type, resData.data.rows)
	})
}

db.prototype.insertIntoDB = function(dataType, file) {
	var stream = fs.createReadStream(file.path, {headers: true})
	var headers
	csv
		.fromStream(stream)
		.transform(function(data) {
			if (headers) {
				var paired = {}
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

			var test = new TestData()
			test.z = data.z
			test.y = data.y
			test.x = data.x
			test.w = data.w
			test.v = data.v
			console.log(test)
			test.save(function(err) {
				if (err)
					throw err
				console.log('Data stored')
			})
		})
		.on('end', function() {
			console.log('stream done')
		})
}

module.exports = new db()
