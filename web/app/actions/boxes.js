
export default {boxes:[],meta:{},activeBox:{},close:true};


export function toggleBoxesList(show) {
	return (dispatch, getState) => {
		var {close}=getState();
		if(typeof show!=='undefined')
			return { close:!!show };
		else
			return { close:!close };
	}
}

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

		return { boxes, activeBox};
	}
}

export function getBoxes() {
	return (dispatch, getState) => {

		return {
			boxes:[
				{name: '知识整理积累',id:991,	type:0,active:true},
				{name: '密码助记',id:1991,	type:1},
				{name: '任务计划管理',id:1992,	type:2},
				{name: '人脉管理',id:1993,	type:3},
			],
			activeBox:{
				name: '知识整理积累',id:9991,active:true,type:0
			}
		};
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
				activeBox.active=true;
				boxes.splice(i, 1);
				break;
			}
		}

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
		return {boxes:[...boxes],activeBox};
	};
}

export function updateBoxes(boxes) {
	return (dispatch, getState) => {
		return {boxes};
	};
}

export function addBox() {
	return (dispatch, getState) => {
		var {boxes=[]}=getState();
		var box={
			id:Math.random(),
			name: '',
			active:true
		};
		boxes.forEach((item)=>{
			item.active=false;
		});
		boxes.unshift(box);
		return {boxes:[...boxes],activeBox:box};
	};
}



