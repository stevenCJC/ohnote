var _SOCKET=io(),
	PASSKEE_SOCKET_HANDLERS={},
	socket;

socket = function (obj){
	for(var key in obj)
		(PASSKEE_SOCKET_HANDLERS[key]=PASSKEE_SOCKET_HANDLERS[key]||[]).push(obj[key]);
};

socket.on=function(key,callback){
	(PASSKEE_SOCKET_HANDLERS[key]=PASSKEE_SOCKET_HANDLERS[key]||[]).push(callback);
};

socket.emit=function(){
	console.log('------> emit',arguments[0],arguments[1]);
	_SOCKET.emit(arguments[0],arguments[1],arguments[3]);
};

socket.disconnect=function() {
	_SOCKET.disconnect();
};


(function(_SOCKET,socket,PASSKEE_SOCKET_HANDLERS){
	_SOCKET.on('PASSKEE_SOCKET',handler);

	function handler(data){
		console.log('<------- PASSKEE_SOCKET',data);
		if(data.SERVER_SOCKET_READY){
			var tmp=setInterval(function(){
				if(Object.keys(PASSKEE_SOCKET_HANDLERS).length>0) {
					clearInterval(tmp);
					_SOCKET.emit('CLIENT_SOCKET_READY',true);
					socket.connected=false;
					handler({connect:true});
				}
			},200);
		} else
			runHandlers(data);
	}

	_SOCKET.on('disconnect',function(data){
		socket.connected=false;
		handler({disconnect:data});
	});

	function runHandlers(data) {
		var keys=Object.keys(data),handlers;
		for(var i=0,l=keys.length;i<l;i++){
			if(handlers=PASSKEE_SOCKET_HANDLERS[keys[i]]) handlers.forEach(function(item){
				try{
					item(data[keys[i]]);
				}catch (e){
					console.error(e);
				}
			});
		}
	}

})(_SOCKET,socket,PASSKEE_SOCKET_HANDLERS);




