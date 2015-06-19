var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var userConnection = mongoose.createConnection('mongodb://localhost/organizations')

var Organization = new Schema({
    username: String,
    password: String,
    companyName: String,
    partners: [String]
})

User.plugin(passportLocalMongoose)

module.exports = userConnection.model('Organization', Organization)
