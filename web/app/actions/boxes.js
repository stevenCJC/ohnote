
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
				{name: '知识整理积累',id:1,	type:0,active:true},
				{name: '密码助记',id:11,	type:1},
				{name: '任务计划管理',id:12,	type:2},
				{name: '人脉管理',id:13,	type:3},
			],
			activeBox:{
				name: '知识整理积累',id:1,active:true,type:0
			}
		};
	}
}


export function deleteBox(box) {
	return (dispatch, getState) => {
		var {boxes=[]}=getState();
		var index=-1;
		for(let i =0;i<boxes.length;i++)
			if(boxes[i].id===boxe.id) {
				boxes.splice(i,1);
				break;
			}
		return {boxes}
	};
}

export function updateBox(box) {
	return (dispatch, getState) => {
		var {boxes=[]}=getState();
		for(let i =0;i<boxes.length;i++)
			if(boxes[i].id===box.id) {
				list[i]=box;
				break;
			}
		return {boxes};
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



