//数据库接口库
var path = require('path');
var sqlite3 = require('sqlite3');

sqlite3.verbose();

function Sqlite(dbPath){
	this.conn=null;
	this.path=dbPath;
	this.connect(function(){
		console.log('Sqlite connected.');
	});
}

Sqlite.prototype={
	connect:function(callback){
		 var self=this;
		if(!this.conn||!this.conn.open){
			//console.log('!this.conn||!this.conn.open');
			this.conn=new sqlite3.Database(this.path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
				function(err){
					if (err){
						console.log(err);
					} else {
						callback&&callback(self.conn);
					}
				});
		}else{
			//console.log('this.conn||this.conn.open');
			callback&&callback(this.conn);
		}
	},
	run:function(){
		var args=arguments;
		this.connect(function(conn){
			conn.run(args[0],args[1],args[2]);
		});
	},
	each:function(){
		var args=arguments;
		this.connect(function(conn){
			//console.log('this.connect',conn,args);
			conn.each(args[0],args[1],args[2]);
		});
	},
	all:function(){
		var args=arguments;
		this.connect(function(conn){
			conn.all(args[0],args[1],args[2]);
			//conn.close();
		});
	},
}

module.exports=new Sqlite(path.join(__dirname,"../db/ohnote.sqlite3"));















