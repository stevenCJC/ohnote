

//console.log(conf);
module.exports =function(configPath){
	var file = require('../../utils/file.js');
	console.log(configPath);
	var conf=require(configPath);
	var path = require('path');
	var fs=require('fs');
	
	var cpathR=new RegExp(conf.config.path.replace(/\\/g,'\\\\'))
	var path_,name;
	var files=file.getFiles(conf.config.path,/\.js$/i);
	for(var x in files){
		path_=files[x].replace(cpathR,'').split('\\');
		name=path_.pop().replace(/\.js/i,'').replace(/\//g,'');
		if(configPath.replace(/\\|\//g,'')!=files[x].replace(/\\|\//g,''))
			conf[name]=require(files[x]);
	}

	console.log('config',conf);
	
	global.config= conf;
};




