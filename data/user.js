var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')
var ObjectId = mongoose.Schema.types.ObjectId

var userConnection = mongoose.createConnection('mongodb://localhost/users')

var User = new Schema({
    username: String,
    password: String,
    companyName: String,
    partners: [ObjectId]

})

User.plugin(passportLocalMongoose)

module.exports = userConnection.model('User', User)
