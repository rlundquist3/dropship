var bcrypt = require('bcrypt-nodejs')
var db = require('./db.js')

function User() {
    this.username
    this.password
}

var method = User.prototype

method.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

method.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

method.find = function(username) {
    db.getUser(username, function(err, data) {
        return data
    })
}

method.save = function() {
    db.saveUser(this)
}

module.exports = User
