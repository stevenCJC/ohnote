var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cfg = global.config;
var useMiddleware= require('./useMiddleware.js');
var useSocket= require('./useSocket.js');


useMiddleware(app);

useSocket.init(io);

module.exports=function(){
	http.listen(cfg.port, function(){
		console.log('listening on :'+cfg.port);
	});
}

