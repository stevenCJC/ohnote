//数据库接口库
var db = require('../utils/sqlite');

exports.list = function(callback){
    db.all("SELECT * FROM user",[], callback);
}

exports.deleteById = function(id,callback){
    if(id!=1)
        db.all("delete FROM user where id=?",[id], callback);
}

exports.checkName = function(name, callback){
    db.all("SELECT id FROM user where name=?",[name], callback);
}

exports.addAccount = function(name, pwd, callback){
    db.run("INSERT INTO user (name, pwd) VALUES (?, ?);",
        [name, pwd],callback);
}

exports.updatePwd = function(id, pwd, callback){
    db.run("update user set pwd=? where id=?",
        [pwd, id],callback);
}

exports.updateName = function(id, name, callback){
    db.run("update user set name=? where id=?",
        [name, id],callback);
}

exports.login = function(name, pwd, callback){
    db.all("SELECT * FROM user where name=? and pwd=?",[name, pwd], callback);
}












