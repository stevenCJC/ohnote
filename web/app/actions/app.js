
export default {user:{},setting:{},box:{},contextMenu:{},focus:{},meta:{}};


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