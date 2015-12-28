var mysql = require('mysql');
var pool  = mysql.createPool(env);
 
exports.query = function (){
	
	let args=Array.prototype.slice.call(arguments);
	
	if(typeof args[args.length-1] !== 'function') args.push(function(){});
	
	this.getConnection(function (err, connection){
		let cb=function(){
			let rel=args[args.length-1].call(this,arguments);
			rel!==false&&connection.release();
		};
		if(args.length==2)
			connection.query(args[0], cb);
		else if(args.length==3) 
			connection.query(args[0], args[1], cb);
		
	})
	
	
}.bind(pool);











