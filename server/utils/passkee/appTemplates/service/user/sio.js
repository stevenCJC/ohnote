
module.exports = {
	add:function(sio,data){
		console.log(data);
		sio.join(data.id);
		//sio.broadcast 如果jessy没有被join过，to过去就没有，所以无法送到jessy
		sio.broadcast.to(data.to).emit('news',data.msg);
	},
	
};




