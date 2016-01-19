var path = require('path');
module.exports={
	port:3000,
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
	mongodb:{
		dbname:'passkee',
	},
};

