//数据库接口库
var db = require('../utils/sqlite');

db.run("INSERT INTO user (name, pwd) VALUES (?, ?);", [1, 2],
	function(data){
		console.log('data',this);
	});









