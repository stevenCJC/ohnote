var path = require('path');
module.exports={
	port:8040,
	socket:true,
	http:true,
	session:{
		timeout:15*60*1000,//分钟
	},
	//path:dir.join('\\'),
	static:path.join(__dirname,'../client'),
	service:{
		path:path.join(__dirname,'../service'),
	},
	config:{
		path:path.join(__dirname,'../config'),
	},
	sqlite:path.join(__dirname,'../db/ohnote.sqlite3')
	
};

