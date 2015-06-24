var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var jade = require('jade')
//var swig = require('swig')
var http = require('http')
var bodyParser = require('body-parser')
var multer = require('multer')
var util = require('util')
var db = require('./data/db.js')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var cookieParser = require('cookie-parser')
var companyData = require('./data/testData.js')
//var bootstrap = require('bootstrap')

/*
var https = require('https')
var options = {
	key: fs.readFileSync('dropship-key.pem')
	cert: fs.readFileSync('dropship-cert.pem')
}
var server = https.createServer(options, app).listen(PORT, HOST)
console.log('HTTPS server listening on %s:%s', HOST, PORT)
*/

var PORT = 8000
var HOST = 'localhost'

var server = http.createServer(app).listen(PORT, HOST)
console.log('HTTP server listening on %s:%s', HOST, PORT)

var io = require('socket.io')(server)

var tabs = ['products',
			'inventory'/*,
			'orders',
			'partners',
			'profile'*/]

//app.engine('html', swig.renderFile)
//app.set('view engine', 'html')
app.use(express.static(__dirname + '/layout/'))
app.set('views', __dirname + '/layout/')
app.set('view engine', 'jade')


var uploadDone = false
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use(session({
	secret: 'turtlesoup',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

var User = require('./data/user.js')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(multer({
	dest: './uploads/',
	rename: function(fieldname, filename, req) {
		return (req.body.uploadType + '_' + filename + '_' + Date.now()).replace(' ', '').toLowerCase()
	},
	onFileUploadStart: function(file) {
		console.log('upload of started...')
	},
	onFileUploadComplete: function(file) {
		console.log(file.fieldname + ' saved as ' + file.path)
		db.insertIntoDB(file.name.split('_')[0], file)
		uploadDone = true
	}
}))

io.on('connection', function(socket) {
	console.log('socket connection')
	socket.on('get_company_data', function(socket) {
		console.log('company data request')
		loadCompanyData()
	})
	socket.on('product_confirm', function(data) {
		console.log(data)
	})
	socket.on('inventory_confirm', function(data) {
		console.log(data)
	})
})

app.get('/', function(req, res) {
	res.render('index')
})

app.post('/signup', function(req, res) {
	if (req.body.password == req.body.confirmPassword) {
		User.register(new User({username: req.body.username, companyName: req.body.company}), req.body.password, function(err, account) {
			if (err)
				return res.render('index')

			passport.authenticate('local', {successRedirect: util.format('/%s', req.body.username), failureRedirect: '/'})(req, res)
		})
	}
})

app.post('/login', passport.authenticate('local'), function(err, req, res) {
	console.log('logging in')
	if (err)
		console.log('login error')
	res.redirect(util.format('/%s', req.user.username))
})

app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

app.get('/:username', function(req, res) {
	if (req.user && req.params.username == req.user.username) {
		var partnerRequest = ''
		if (req.user.partnerRequests) {
			partnerRequest = req.user.partnerRequests[0]
			/*User.findById(req.user.partnerRequests[0], function(err, user) {
				partnerRequest = user.companyName
			})*/
		}
		res.render('profile', {company_name: req.user.companyName,
								request_company: partnerRequest}, function(err, html) {
			if (err)
				console.log(err)
			else {
				console.log('no error')
				res.send(html)
			}
		})
	} else {
		User.findOne({username: req.params.username}, function(err, user) {
			if (err)
				throw err
			var displayName = ''
			if (req.user)
				displayName = req.user.companyName
			res.render('company', {company_name: displayName,
									name: user.companyName,
									username: user.username,
									description: 'need to add this'})
		})
	}
})

app.post('/uploadFile', function(req, res) {
	if (uploadDone) {
		res.redirect('back')
	}
})

app.post('/partnerRequest', function(req, res) {
	User.findOne({username: req.body.target}, function(err, user) {
		if (err)
			throw err
		user.partnerRequests.push(req.user._id)
		user.save()
	})
	//User.findOneAndUpdate({username: req.body.target}, {$push: {partnerRequests: req.user._id}})
})

app.post('/partnerConfirm', function(req, res) {
	User.findOne({_id: req.body.target}, function(err, user) {
		if (err)
			throw err
		user.partners.push(req.user._id)
		user.save()
	})
	//User.findOneAndUpdate({username: req.body.target}, {$push: {partners: req.user._id}})
	User.findById(req.user._id, function(err, user) {
		if (err)
			throw err
		user.partners.push(user.partnerRequests[0])
		user.partnerRequests.splice(0, 1)
		user.save()
	})
})

function loadCompanyData() {
	for (var tab of tabs) {
		db.getFromDB(tab, function(err, tab, data) {
			if (err)
				throw err
			io.emit(util.format('%s_data', tab), data)
		})
	}
}
