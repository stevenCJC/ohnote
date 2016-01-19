module.exports = {
	onAppStart:function(app){
		
	},
	onSessionStart:function(req,res){
		
	},
	onSessionDestroy:function(req,res){
		
	},
	onSocketConnect:function(sio){
		console.log('Socket Connected!');
	},
	onSocketDisconnect:function(sio){
		console.log('Socket Disconnected!');
	},

	onRequest:function(req,res){

		if(req.originalUrl !=='/favicon.ico'){
			if(req.session.user&&req.session.user.id!==1 && req.originalUrl.indexOf('/account')>-1){
				res.redirect('/');
				return false;
			}

			if(!req.session.logined && req.originalUrl.indexOf('/login')==-1) {
				res.redirect('/login');
				return false;
			}else if(req.session.logined){
				if(req.originalUrl=='/login/'||req.originalUrl=='/login'){
					res.redirect('/');
					return false;
				}
			}
		}
	},

	onApiRequest:function(req,res){
		if(!req.session.logined && req.originalUrl!=='/login/valid') {
			res.redirect('/login');
			return false;
		}
	},
	onSocketRequest:function(emit,data,session){
		if(!session||!session.logined) {
			emit({'redirect':'/login'});
			return false;
		}
	},
};