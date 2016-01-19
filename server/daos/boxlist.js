//数据库接口库
var db = require('../utils/sqlite');
var booklist = require('./booklist');


exports.select = select;
function select(userid, callback){
	db.each("SELECT * FROM boxlist where userid=?",
		[userid],function(err,data){
			if(!err) data.list=JSON.parse(data.list||'[]');
			callback(err,data);

		});
}

exports.deleteByUserid =deleteByUserid;
function deleteByUserid(userid, callback){
	db.run("DELETE FROM boxlist WHERE userid = ?",
		[userid],callback);
	db.run("DELETE FROM booklist WHERE userid = ?",
		[userid],function(err){});
	db.run("DELETE FROM notelist WHERE userid = ?",
		[userid],function(err){});
	db.run("DELETE FROM note WHERE userid = ?",
		[userid],function(err){});
}

exports.insert =insert;
function insert(userid, callback){
	db.run("INSERT INTO boxlist (userid, list) VALUES (?, ?);",
		[userid,  '[]'],callback);
}

exports.addItem = addItem;
function addItem(data, list, userid, callback){
	booklist.insert(userid, function(err){
		if(!err){
			var item=Object.assign({name: '', id: this.lastID, type: 0}, data);
			list.unshift(item);
			update(list, userid, function(err){
				if(err) list.shift();
				callback(err, item);
			});
		}
	});
}


exports.update = update;
function update(list, userid, callback){
	db.run("update boxlist set list=? where userid=?",
		[JSON.stringify(list), userid],callback);
}





