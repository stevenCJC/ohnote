var user = require('../../daos/user');
var md5 = require('md5');



module.exports = {

	newAccount : function (req, res, session) {
		var name=(req.body.name||'').trim();
		var pwd=md5((req.body.pwd||'').trim());
		if(!name||!(req.body.pwd||'').trim()){
			res.send('the name or pwd is required');
		}else {
			user.checkName(name, function (err, data) {
				if (!data.length) {
					user.addAccount(name, pwd, function (err) {
						if (err) {
							res.send('addAccount err');
						}
						else {
							res.send('addAccount success');
						}
					});
				} else {
					res.send('the name is exist');
				}
			});
		}
	},

	resetPassword : function (req, res, session) {
		var id=parseInt((req.body.id||'').trim());
		if(id){
			var pwd=md5((req.body.pwd||'').trim());
			user.updatePwd(id, pwd,function(err){
				if(err) {
					res.send('resetPassword err');
				}
				else {
					res.send('resetPassword success');
				}
			});
		}else res.send('id is required');
	},

	resetName : function (req, res, session) {
		var id=parseInt((req.body.id||'').trim());
		if(id){
			var name=(req.body.name||'').trim();
			user.updateName(id, name,function(err){
				if(err) {
					res.send('resetName err');
				}
				else {
					res.send('resetName success');
				}
			});
		}else res.send('id is required');
	},

	checkAccount : function (req, res, session) {
		var name=(req.body.name||'').trim();
		user.checkName(name,function(err,data){
			if(!data.length){
				res.send('Not exist');
			}else {
				res.send('Exist');
			}
		});
	},
	deleteAccount : function (req, res, session) {
		var id = parseInt((req.body.id || '').trim());
		if (id) {
			user.deleteById(id, function (err) {
				if (err) {
					res.send('err');
				} else {
					res.send('success');
				}
			});
		}else res.send('id is required');
	},
	list : function (req, res, session) {
		user.list(function(err,data){
			if(!data.length){
				res.send('none');
			}else {
				var html='<table style="width:100%"><thead><tr>' +
					'<td><b>ID</b></td>' +
					'<td><b>User Name</b></td>' +
					'<td><b>PWD</b></td>' +
					'</tr></thead><tbody>';
				for(var i=0;i<data.length;i++){
					html+='<tr>'
					for(x in data[i]) if(data[i].hasOwnProperty(x)){
						html+='<td>'+data[i][x]+'</td>';
					}
					html+='</tr>'
				}
				html+='</tbody></table>';
				res.send(html);
			}
		});
	},

};
