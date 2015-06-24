var fs = require('fs')
var csv = require('fast-csv')
var TestData = require('./testData.js')
var User = require('./user.js')

var db = function() {

}

db.prototype.loadPartnerRequests = function(id, callback) {
	User.findById(id, function(err, user) {
		if (err)
			throw err

		var requestCompanies = []
		user.partnerRequests.forEach(function(requestCompany) {
			//add each request company name to array
		})
		/*for (var requestCompany of user.partnerRequests) {

		}*/
	})
}

db.prototype.getFromDB = function(type, callback) {
	TestData.find({}, function(err, data) {
		if (err)
			throw err

		var rows = []
		data.forEach(function(data) {
			rows.push(data)
		})
		callback(null, type, rows)
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
			for (var property in data) {
				if (data.hasOwnProperty(property))
					test[property] = data[property]
			}
			console.log(test)
			test.save(function(err) {
				if (err)
					throw err
				console.log('Data stored successfully')
			})
		})
		.on('end', function() {
			console.log('stream done')
		})
}

module.exports = new db()
