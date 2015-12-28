
export default {list:[],meta:{}};


export function setActiveNote(note) {
	return (dispatch, getState) => {
		var {list=[]}=getState();
		list.forEach((item)=>{
			if(item.id!==book.id)
				item.active=false;
			else item.active=true;
		})
		return { list };
	}
}

export function getNoteList(book) {
	return async (dispatch, getState) => {

		return { list:{
			title: '',
			children: [{
				title: 'react入门笔记',
				tips: 'react 安装',
				leaf: false,
				children: [{
					title: 'react生命周期',
					tips: 'constructor启动',
					leaf: false
				}, {
					title: 'react有用插件积累',
					tips:'react-ui-tree.cssreact-ui-tree.cssreact-ui-tree.cssreact-ui-tree.css',
					leaf: false
				}, {
					title: 'redux学习笔记',
					tips:'redux 、 reflux 、 flux',
					leaf: false
				}]
			}]
		} };
	}
}




export function getNoteDetails(note) {
	return (dispatch, getState) => {
		var {list=[]}=getState();
		list.forEach((item)=>{
			if(item.id===note.id)
				item.content='这是内容';
		})
		return {list}
	}
}

export function deleteNote(note) {
	return (dispatch, getState) => {
		var {list=[]}=getState();
		var index=-1;
		for(let i =0;i<list.length;i++)
			if(list[i].id===note.id) {
				list.splice(i,1);
				break;
			}
		return {list}
	};
}

export function updateNote(note) {
	return (dispatch, getState) => {
		var {list=[]}=getState();
		for(let i =0;i<list.length;i++)
			if(list[i].id===note.id) {
				list[i]=note;
				break;
			}
		return {list};
	};
}

export function addNote() {
	return (dispatch, getState) => {
		var {list=[]}=getState();
		list.unshift({
			id:'',
			title: '',
			tips:'',
			leaf: false,
			content:''
		});
		return {list};
	};
}




