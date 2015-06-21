var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.types.ObjectId

var dataTestConnection = mongoose.createConnection('mongodb://localhost/test_data')

var TestData = new Schema({
    company: ObjectId,
    z: String,
    y: String,
    x: String,
    w: String,
    v: String
})

module.exports = dataTestConnection.model('TestData', TestData)
