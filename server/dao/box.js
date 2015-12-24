var dao = require('../util/dao');


module.export={
	add:function(userId,title,type){
		dao.query('insert into box(title,userId,type) values(?,?,?)',
			[title,userId,type],
			function(err){
				return false;
		});
	},
}



















