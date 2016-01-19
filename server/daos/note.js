//数据库接口库
var db = require('../utils/sqlite');

exports.select = select;
function select(id, callback){
	db.each("SELECT * FROM note where id=?",
		[id], callback);
}

exports.insert =  insert;
function insert(bookid, boxid, userid, callback){
	return db.run("INSERT INTO note (content,bookid,boxid,userid) VALUES (?,?,?,?);",
		['', bookid, boxid, userid],callback);
}


exports.delete = del;
function del(id, callback){
	db.run("DELETE FROM note WHERE id = ?;",
		[id],callback);
}
exports.deleteByBookid =deleteByBookid;
function deleteByBookid(bookid, callback){
	db.run("DELETE FROM note WHERE bookid = ?;",
		[bookid],callback);
}
exports.deleteByBoxid = deleteByBoxid;
function deleteByBoxid(boxid, callback){
	db.run("DELETE FROM note WHERE boxid = ?;",
		[boxid],callback);
}
exports.deleteByUserid = deleteByUserid;
function deleteByUserid(userid, callback){
	db.run("DELETE FROM note WHERE userid = ?;",
		[userid],callback);
}

exports.update =update;
function update(content, id, callback){
	db.run("update note set content=? where id=?",
		[content, id],callback);
}












