var path = require('path');
module.exports={
	port:8040,
	socket:true,
	http:true,
	session:{
		timeout:15*60*1000,//分钟
		timespan:6000,
	},
	//path:dir.join('\\'),
	static:path.join(__dirname,'../client'),
	service:{
		path:path.join(__dirname,'../service'),
	},
	config:{
		path:path.join(__dirname,'../config'),
	},
	mysql:{
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'ohnote',
		port: 3306
	},
	
};

