var fs = require('fs')
var csv = require('fast-csv')
var uuid = require('uuid')
var nodeCouchDB = require('node-couchdb')

var couch = new nodeCouchDB('localhost', 5984)

var db = function() {

}

db.prototype.getUser = function(username, callback) {
	var db = 'users'
	var query = '/_design/users/_view/username'
	var queryOptions = {
		key: username
	}
	couch.get(db, query, queryOptions, function(err, resData) {
		if (err)
			throw err
		callback(null, resData.data)
	})
}

db.prototype.saveUser = function(user) {
	var data = {
		_id: uuid.v1(),
		username: user.username,
		password: user.password
	}
	couch.insert('users', data, function(err, resData) {
		if (err)
			throw err
		console.dir(resData)
	})
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

module.exports = new db()
