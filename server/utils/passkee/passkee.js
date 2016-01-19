var file=require('./utils/file.js');
module.exports = {
	init:function(configPath){
		//配置文件最先加载
		var cfg=require('./core/app/cfg.js')(configPath);
		
		var mediator=require('./utils/mediator.js');
		global.app = {
			state:{},
			config:cfg,
			file:file,
			pub:function(channel,message){
				mediator.publish(channel,message);
			},
			sub:function(channel,callback){
				mediator.subscribe(channel,callback);
			},
		};
		require('./core/main.js');
	},
	
	make:function(tplName){
		var path=require('path');
		var ppath=path.dirname(module.parent.filename);
		file.copy(__dirname+'/appTemplates',ppath,1);
	},
	
};
