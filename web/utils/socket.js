import {redux2} from 'redux2';


function connect(){
    if(!socket.connected){
        socket.connect();
    }
}

function disconnect(){
    if(socket&&socket.connected)socket.disconnect();
}



connect();

console.log({socket});

window.socketSub={};

export default {
    socket:{
        on:(path,callback)=>{
            window.socketSub[path]=window.socketSub[path]||[];
            window.socketSub[path].push(callback);
        },

        emit:socket.emit

    },
    connect,
    disconnect
}










