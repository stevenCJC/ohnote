var crypto = require('crypto');

//持久化登录状态尚未支持

function Sessions(){

	if(global.config.session&&global.config.session.timeout) this.timeout=global.config.session.timeout;
	else if(!global.config.session||!global.config.session.timeout) this.timeout=30*24*3600;

}

Sessions.prototype={
	constructor:Sessions,
	maker:function(){
		var me=this;
		return function(req, res, next) {
			if(!req.cookies||!req.cookies.PASSKEE_SSID){
				var agent=req.headers['user-agent'];
				var sid = crypto.createHash('sha256').update(agent+Math.random()+(new Date).getTime()).digest('hex');
				sid = crypto.createHash('md5').update(sid+Math.random()+(new Date).getTime()).digest('hex');
				res.cookie('PASSKEE_SSID', sid);
				req.cookies=req.cookies||{};
				req.cookies.PASSKEE_SSID=sid;
			}
			var ss=me[req.cookies.PASSKEE_SSID];
			if(ss) {
				if(ss.checkTimeout()) {
					me.destroy(req, res);
					return;
				}

				req.session=ss;
				ss.refresh(me.timeout);
			}else
				me.sessionStart(req,res);
			next();
		}
	},
	sessionStart:function(req,res){
		if(!req.cookies||!req.cookies.PASSKEE_SSID||!this[req.cookies.PASSKEE_SSID]){
			req.session=this[req.cookies.PASSKEE_SSID]=new Session(req.cookies.PASSKEE_SSID,this.timeout);
			if(global.config&&global.config.event&&global.config.event.onSessionStart) 
				global.config.event.onSessionStart(req,res,this[req.cookies.PASSKEE_SSID]);
		}
	},
	destroy:function(req,res){
		if(req.cookies&&req.cookies.PASSKEE_SSID){
			var sid=req.cookies.PASSKEE_SSID;
			if(global.config&&global.config.event&&global.config.event.onSessionDestroy)
				global.config.event.onSessionDestroy(req,res,this[sid]);
			this[sid].destroy();
			delete this[sid];
			res.cookie('PASSKEE_SSID', null);
			req.cookies.PASSKEE_SSID=null;
		}
	}
};


function Session(sid,timeout){
	this._SID_=sid;
	this.refresh(timeout);
}

Session.prototype={
	constructor:Session,
	destroy:function(){
		for(x in this)this[x]=null;
	},
	get:function(key){
		return this[key];
	},
	set:function(key,value, save){
		this[key] = value;
		save && this.saveToStore();
	},
	refresh:function(timeout){
		var d=new Date();
		this._DEADLINE_=d.getTime()+parseInt(timeout);
	},
	checkTimeout:function(){
		return this._DEADLINE_<=(new Date()).getTime();
	},
	saveToStore:function(){
		//保存到

	},
	fromStore:function(){

	}
	
};

















module.exports = Sessions;

