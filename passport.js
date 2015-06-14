var LocalStrategy = require('passport-local').Strategy
var User = require('./user.js')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(user, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.find(username, function(err, user) {
            if (err)
                return done(err)
            if (user)
                return done(null, false, req.flash('signupMessage', 'Username already exists'))
            else {
                var newUser = new User()
                newUser.username = username
                newUser.password = newUser.generateHash(password)

                newUser.save(function(err) {
                    if (err)
                        throw err
                    return done(null, newUser)
                })
            }
        })
    }))
    
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.find(username, function(err, user) {
            if (err)
                return done(err)
            if (!user)
                return done(null, false, req.flash('loginMessage', 'User not found'))
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Incorrect password'))
            return done(null, user)
        })
    }
    }))
}
