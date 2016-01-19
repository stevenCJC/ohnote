var db = require('../utils/sqlite');
var notelist = require('./notelist');

exports.select =select;
function select(boxid, callback){
	db.each("SELECT * FROM booklist where boxid=?", [boxid],
		function(err,data){
			if(!err) data.list=JSON.parse(data.list||'[]');
			else console.error(err);
			callback(err,data);
		});
}


exports.deleteByBoxid = deleteByBoxid;
function deleteByBoxid(boxid, callback){
	db.run("DELETE FROM booklist WHERE boxid = ?;",
		[boxid],callback);
	db.run("DELETE FROM notelist WHERE boxid = ?",
		[boxid],function(err){});
	db.run("DELETE FROM note WHERE boxid = ?",
		[boxid],function(err){});
}
exports.deleteByUserid = deleteByUserid;
function deleteByUserid(userid, callback){
	db.run("DELETE FROM booklist WHERE userid = ?;",
		[userid],callback);
	db.run("DELETE FROM notelist WHERE userid = ?",
		[userid],function(err){});
	db.run("DELETE FROM note WHERE userid = ?",
		[userid],function(err){});
}

exports.addItem = addItem;
function addItem(data, list, boxid, userid, callback){
	notelist.insert(boxid, userid, function(err){
		if(!err){
			var item=Object.assign({name: '', id: this.lastID, color:list.length%20+1}, data);
			list.unshift(item);
			update(list, boxid, function(err){
				if(err) list.shift();
				callback(err, item);
			});
		}
	});
}

exports.insert = insert;
function insert(userid, callback){
	db.run("INSERT INTO booklist (list, userid) VALUES (?, ?);",
		['[]', userid],callback);
}

exports.update = update;
function update(list, boxid, callback){
	db.run("update booklist set list=? where boxid=?",
		[JSON.stringify(list), boxid],callback);
}





