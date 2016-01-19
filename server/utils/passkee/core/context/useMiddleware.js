var path = require('path');
var crypto = require('crypto');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var api=require('../app/api.js');
var cfg= global.config;
var session= require('./session.js');
//var session = require('express-session');
//var RedisStore = require('connect-redis')(session);
var useSocket= require('./useSocket.js');

global.sessions=new session(cfg.session);

module.exports=function(app){
	
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	/*app.use(function(req, res, next) {
		if(!req.cookies||!req.cookies.PASSKEE_SSID){
			var agent=req.headers['user-agent'];
			var sid = crypto.createHash('sha256').update(agent+Math.random()+(new Date).getTime()).digest('hex');
			sid = crypto.createHash('md5').update(sid+Math.random()+(new Date).getTime()).digest('hex');
			res.cookie('PASSKEE_SSID', sid);
			req.cookies=req.cookies||{};
			req.cookies.PASSKEE_SSID=sid;
		}
		next();
	});*/

	app.use(global.sessions.maker());
	/*app.use(session({
		store: new RedisStore({
			host: "localhost",
			port: 6379, 
			//db: "passkee"
		}),
		resave:false,
		saveUninitialized:false,
		secret: 'keyboard cat'
	}))*/

	app.use(function(req, res, next) {
		if(cfg.event.onRequest&&cfg.event.onRequest(req, res)!==false)
			next();
	});
	
	//app.use(useSocket.maker());
	
	app.use(express.static(cfg.static,{
		dotfiles: 'ignore',
		etag: false,
		extensions: ['htm','html','css','png','gif','jpg','js','tpl','svg'],
		index: 'index.html',
		maxAge: '3600000',
		redirect: true,
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now())
		}
	}));

	
	for(var x in api) if(api[x]) {
		(function(handler){
			app.use(x, function(req,res){
				//console.log(cfg.event,cfg.event.onApiRequest);
				if(cfg.event&&cfg.event.onApiRequest&&cfg.event.onApiRequest(req,res)!==false)
					handler(req,res,req.session);
			});
		})(api[x]);

	}

	app.use('/passkee/passkee.js', function(req,res){
		res.sendFile(path.join(__dirname,'../../browser.js'));
	});
	
	
	app.use(function(req, res, next) {
		//if()
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	
	app.use(function(err, req, res, next) {
		console.log(err,req.originalUrl);
	});
	
	

	
	
	
}