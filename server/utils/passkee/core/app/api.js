var file = require('../../utils/file.js');
var cfg=global.config;


var api,route,api_src={};
var files=file.getFiles(cfg.service.path,/api\.js$/i); 
for(var i in files){ 
	api=require(files[i]);
	//console.log()
	route=files[i].replace(new RegExp(cfg.service.path.replace(/\\/g,'\\\\')),'').split(/\\|\//g);
	//console.log(route);
	route.pop();  
	route=route.join('/'); 
	for(var x in api)
		api_src[route+'/'+x]=api[x];
	//console.log(api_src);
} 

module.exports = api_src;