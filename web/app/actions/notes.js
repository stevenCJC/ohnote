import tree from 'utils/tree';

export default {list:{children:[]},meta:{},activeNote:{},close:false};


export function toggleNotesList(show) {
	return (dispatch, getState) => {
		var {close}=getState();
		if(typeof show!=='undefined')
			return { close:!!show };
		else
			return { close:!close };
	}
}

export function setActiveNote(note) {
	return (dispatch, getState) => {
		var {list={children:[]},activeNote={}}=getState();

		tree.each(list,function(item,index,arr) {
			if(item.id!==note.id)
				item.active=false;
			if(item.id===note.id){
				item.active=true;
				activeNote=item;
			}
		});

		return { list,activeNote };
	}
}

export function getNoteList(book) {
	return async (dispatch, getState) => {

		return { list:{
			children: [{
				id:1,
				title: 'react入门笔记',
				tips: 'react 安装',
				leaf: false,
				children: [{
					id:12,
					title: 'react生命周期',
					tips: 'constructor启动',
					leaf: false
				}, {
					id:13,
					title: 'react有用插件积累',
					tips:'react-ui-tree.cssreact-ui-tree.cssreact-ui-tree.cssreact-ui-tree.css',
					leaf: false
				}, {
					id:14,
					title: 'redux学习笔记',
					tips:'redux 、 reflux 、 flux',
					leaf: false
				}]
			}]
		} ,
			activeNote:{
				id:1,
				title: 'react入门笔记',
				tips: 'react 安装',
				leaf: false
			}

		};
	}
}




export function getNoteDetails(note) {
	return (dispatch, getState) => {
		var {list={children:[]},activeNote={}}=getState();
		tree.each(list,function(item,index,arr) {
			if(item.id===note.id) {
				item.content = item.content||'这是内容';
				activeNote=item;
			}
		})

		return {list,activeNote}
	}
}

export function deleteNote(note) {
	return (dispatch, getState) => {
		var {list={children:[]}}=getState();
		tree.each(list,function(item,index,arr) {
			if(item.id===note.id) {
				arr.splice(index,1);
				return false;
			}
		});


		return {list}
	};
}

export function updateNote(note) {
	return (dispatch, getState) => {
		var {list={children:[]}}=getState();
		tree.each(list,function(item,index,arr) {
			if(item.id===note.id) {
				Object.assign(arr[index],note);
				return false;
			}
		});
		return {list};
	}
}


export function updateNoteList(list) {
	return (dispatch, getState) => {
		return {list};
	};
}

export function addNote() {
	return (dispatch, getState) => {
		var {list={children:[]}}=getState();
		tree.each(list,function(item,index,arr) {
			item.active=false;
		});
		var activeNote={
			id:Math.random(),
			active:true,
			title: '',
			tips:'',
			leaf: false,
			content:''
		};
		list.children.unshift(activeNote);
		return {list,activeNote};
	};
}




