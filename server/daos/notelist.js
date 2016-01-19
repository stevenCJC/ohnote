//数据库接口库
var db = require('../utils/sqlite');
var note = require('./note');


exports.select = select;
function select(bookid, callback){
	db.each("SELECT * FROM notelist where bookid=?", [bookid],
		function(err,data){
			if(!err) data.list=JSON.parse(data.list||'{"children":[]}');
			else console.error(err);
			callback(err,data);
		});
}

exports.deleteByBookid = deleteByBookid;
function deleteByBookid(bookid, callback){
	db.run("DELETE FROM notelist WHERE bookid = ?;",
		[bookid],callback);
	db.run("DELETE FROM note WHERE bookid = ?",
		[bookid],function(err){});
}
exports.deleteByBoxid = deleteByBoxid;
function deleteByBoxid(boxid, callback){
	db.run("DELETE FROM notelist WHERE boxid = ?;",
		[boxid],callback);
	db.run("DELETE FROM note WHERE boxid = ?",
		[boxid],function(err){});
}
exports.deleteByUserid = deleteByUserid;
function deleteByUserid(userid, callback){
	db.run("DELETE FROM notelist WHERE userid = ?;",
		[userid],callback);
	db.run("DELETE FROM note WHERE userid = ?",
		[userid],function(err){});
}

exports.addItem = addItem;
function addItem(data, list, bookid, boxid, userid, callback){
	note.insert(bookid, boxid, userid, function(err){
		if(!err){
			var item=Object.assign({title: '',tips:'', id: this.lastID, leaf: false}, data);
			list.children.unshift(item);
			update(list, bookid, function(err){
				if(err) list.children.shift();
				callback(err, item);
			});
		}
	});
}

exports.insert = insert;
function insert(boxid, userid, callback){
	db.run("INSERT INTO notelist (list, boxid, userid) VALUES (?, ?, ?);",
		['{"children":[]}', boxid, userid],  callback );
}

exports.update = update;
function update(list, bookid, callback){
	db.run("update notelist set list=? where bookid=?",
		[JSON.stringify(list), bookid],callback);
}
















