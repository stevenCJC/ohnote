
module.exports = {
	add:function(sio,data){
		console.log(data);
		console.log(sio);
		sio.emit('news',data.msg);
	},
	
};




