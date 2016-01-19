var sio=require('../app/sio.js');
var cfg= global.config;

//在线状态的使用，与session配合
//单个用户多个socket的时候？ 某个请求可能会绑定某个

var sockets={};

module.exports={
	init:function(io){
		io.on('connection', function(socket){

			socket.emit('PASSKEE_SOCKET',{SERVER_SOCKET_READY:true});


			var coo=socket.handshake.headers.cookie;
			//console.log(coo);
			if(coo) coo=coo.split('PASSKEE_SSID=')[1];
			if(coo) coo=coo.split(';')[0];
			if(coo) sockets[coo]=socket;

			//console.log(socket.handshake);
			if(cfg&&cfg.event&&cfg.event.onSocketConnect) 
				cfg.event.onSocketConnect(socket);
			
			socket.on('disconnect', function(){
				delete sockets[coo];
				if(cfg&&cfg.event&&cfg.event.onSocketDisconnect) {
					cfg.event.onSocketDisconnect(socket);
					//socket.emit('disconnect',{});
				}
			});

			if(sio)
				for(var x in sio){
					(function(sio,socket,coo){
						socket.on(x, function(data){
							if(cfg.event&&cfg.event.onSocketRequest&&cfg.event.onSocketRequest(function(obj){
									socket.emit('PASSKEE_SOCKET',obj);
								},data,global.sessions[coo])!==false)
								sio(function(obj){socket.emit('PASSKEE_SOCKET',obj);},data,global.sessions[coo]);
						});
					})(sio[x],socket,coo);

				}
		});
	}
	
}
