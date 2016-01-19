var user = require('../../daos/user');
var md5 = require('md5');



module.exports = {

	valid : function (req, res, session) {
		//console.log(req.body);
		var name=(req.body.name||'').trim();
		var pwd=md5((req.body.pwd||'').trim());
		user.login(name,pwd,function(err,data){
			if(data.length===1) {
				session.logined=true;
				session.user=data[0];
				delete session.user.pwd;
				res.redirect('/');
				///console.log('user logined!',session);
			}else{
				res.redirect('/login?'+'err=1');
			}
		});
	},

	logout:function(req, res, session){

	},



};
