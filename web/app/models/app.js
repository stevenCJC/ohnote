
export default {user:{},setting:{},box:{},contextMenu:{},focus:{},meta:{},socket:false};

socket({
    connect: function (data) {
        socket.emit('app_init',true);
    },
    redirect:function (data) {
        window.location.href=data;
    },
});

export function showContextMenu(item) {
    return (dispatch, getState) => {
        if(item===false){
            return {contextMenu:{type:false,item:{}}};
        }else  if(!item.type||!item.item) throw'showContextMenu event need item and type of arguments';
        return {contextMenu:{...item}};
    }
}

export function focus(item) {
    return (dispatch, getState) => {
        if(item===false){
            return {focus:{type:false,item:{}}};
        }else  if(!item.type||!item.item) throw'showContextMenu event need item and type of arguments';
        return {focus:{...item}};
    }
}

export function socketConnect() {
    return {socket:true}
}

export function socketDisconnect() {
    return {socket:false}
}

