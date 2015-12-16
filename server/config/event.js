module.exports = {
	onAppStart:function(app){
		
	},
	onSessionStart:function(req,res){
		
	},
	onSessionDestroy:function(req,res){
		
	},
	onSocketConnect:function(sio){
		sio.emit('news','onSocketConnect hello !!');
	},
	onSocketDisconnect:function(sio){
		sio.emit('news','onSocketDisconnect hello !!');
	},
	/*onSocketRecieve:function(sio){
		
	},
	onHttpRequest:function(req,res,next){
		
	},*/
	
};