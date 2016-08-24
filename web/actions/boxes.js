import {redux2} from 'redux2';

export default {boxes:[],meta:{},activeBox:{},close:true};



socket({
	'box.list': function (data) {
		//console.log(data);
		redux2.dispatch('getBoxes', data);
	},
	'box.addItem':function(item){
		redux2.dispatch('addBox', item);
	}
});

export function setActiveBox(box) {
	return (dispatch, getState) => {
		var {boxes=[],activeBox={}}=getState();
		boxes.forEach((item)=>{
			if(item.id!==box.id)
				item.active=false;
			if(item.id===box.id){
				item.active=true;
				activeBox=item;
			}
		});
		socket.emit('box.active',box.id);
		return { boxes, activeBox};
	}
}

export function getBoxes(list) {
	return (dispatch, getState) => {
		if(!list) socket.emit('box.list',{});
		else{
			list.activeBox=null;

			for(var i=0,l=list.length;i<l;i++)
				if(list.boxes[i].active) list.activeBox=list.boxes[i];

			if(!list.activeBox && list.boxes[0]){
				list.activeBox=list.boxes[0];
				list.boxes[0].active=true;
			}

			return list;
		}
	}
}

export function deleteBox(box) {
	return (dispatch, getState) => {
		var {boxes=[]}=getState();
		var index=-1,activeBox;
		for(let i = 0;i<boxes.length;i++) {
			if (boxes[i].id === box.id) {
				if(i>0) activeBox=boxes[i-1];
				else  activeBox=boxes[1];
				if(activeBox)
					activeBox.active=true;
				boxes.splice(i, 1);
				break;
			}
		}
		if(activeBox&&activeBox.id){
			socket.emit('book.list', activeBox.id);
			socket.emit('box.active',activeBox.id);
		}else activeBox={};
		socket.emit('box.deleteItem',box.id);
		return {boxes:[...boxes],activeBox};
	};
}

export function updateBox(box) {
	return (dispatch, getState) => {
		if(!box.name&&typeof box.name!='undefined') box.name='~';
		var {boxes=[],activeBox={}}=getState();
		for(let i =0;i<boxes.length;i++)
			if(boxes[i].id===box.id) {
				boxes[i]=Object.assign({},boxes[i],box);
				break;
			}
		if(activeBox.id===box.id){
			activeBox=Object.assign({},activeBox,box);
		}

		socket.emit('box.updateItem',{id:box.id,name:box.name});
		return {boxes:[...boxes],activeBox};
	};
}

export function updateBoxes(boxes) {
	return (dispatch, getState) => {
		var boxlist=[];
		boxes.forEach(function(item){
			boxlist.push({id:item.id,name:item.name,type:item.type,active:item.active});
		});
		socket.emit('box.updateList',boxlist);
		return {boxes};
	};
}

export function addBox(box) {
	return (dispatch, getState) => {
		if(!box) socket.emit('box.addItem',{});
		else {
			var {boxes=[]}=getState();
			boxes.forEach((item)=>{
				item.active=false;
			});
			box.edit=true;
			box.active=true;
			boxes.unshift(box);
			socket.emit('book.list', box.id);
			return {boxes:[...boxes],activeBox:box};
		}
	};
}



