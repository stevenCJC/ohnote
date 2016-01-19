var file = require('../../utils/file.js');
var cfg=global.config;


var sio,route,sio_src={};
var files=file.getFiles(cfg.service.path,/sio\.js$/i);
for(var i in files){
	sio=require(files[i]);
	route=files[i].replace(new RegExp(cfg.service.path.replace(/\\/g,'\\\\')),'').split(/\\|\//g);
	route.pop();
	route.shift();
	route=route.join('.');
	for(var x in sio)
		sio_src[(route?route+'.':'')+x]=sio[x];
}

module.exports = sio_src;