var mongoose = require('mongoose')
var Schema = mongoose.Schema

var dataTestConnection = mongoose.createConnection('mongodb://localhost/test_data')

var TestData = new Schema({
    z: String,
    y: String,
    x: String,
    w: String,
    v: String
})

module.exports = dataTestConnection.model('TestData', TestData)
