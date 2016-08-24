import tree from 'utils/tree';
import {redux2} from 'redux2';

export default {list:{children:[]},meta:{},activeNote:{},close:false};

socket({
	'note.list': function (data) {
		redux2.dispatch('getNoteList', data);
	},
	'note.addItem':function(item){
		redux2.dispatch('addNote', item);
	},
	'note.content':function(item){
		redux2.dispatch('getNoteDetails', item);
	}
});



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
	if(!note.id) return {activeNote:note};
	return (dispatch, getState) => {
		var {list={children:[]},activeNote={}}=getState();
		var bookid=getState('noteBooks').activeBook.id;

		tree.each(list,function(item,index,arr) {
			if(item.id!==note.id)
				item.active=false;
			if(item.id===note.id){
				item.active=true;
				activeNote=item;
			}
		});
		socket.emit('note.active',{id:note.id,bookid:bookid});
		return { list,activeNote };
	}
}

export function getNoteList(data) {
	return async (dispatch, getState) => {
		if(typeof data!=='object') {
			socket.emit('note.list',data);
		}else{

			var activeNote={};

			tree.each(data,function(item,index,arr) {
				if(item.active) {
					activeNote=item;
					return false;
				}
			});

			if(!activeNote.id && data.children[0]){
				data.children[0].active=true;
				activeNote=data.children[0];
			}

			if(activeNote.id) socket.emit('note.content',activeNote.id);

			return {list:data,activeNote:activeNote};
		}
	}
}




export function getNoteDetails(content) {
	return (dispatch, getState) => {
		if(typeof content!=='object') {
			socket.emit('note.content',content);
		}else {
			var {list={children: []},activeNote={}}=getState();
			tree.each(list, function (item, index, arr) {
				if (item.id === activeNote.id) {
					activeNote = {...item};
					activeNote.content=content.content;
				}
			})
			return {list,activeNote}
		}
	}
}

export function deleteNote(note) {
	return (dispatch, getState) => {
		var {list={children:[]},activeNote}=getState();
		var tmp=activeNote;
		tree.each(list,function(item,index,arr,parent) {
			if(item.id===note.id&&note.id) {
				if(activeNote.id===note.id) {
					if (index > 0) activeNote = arr[index - 1];
					else  activeNote = arr[1];
					if (!activeNote) activeNote = parent || {};
				}else{
					let inDeletedTree=false;
					tree.each(item,function(item,index,arr,parent) {
						if(item.id===note.id&&note.id) {
							inDeletedTree=true;
						}
					});
					if(inDeletedTree){
						if (index > 0) activeNote = arr[index - 1];
						else  activeNote = arr[1];
						if (!activeNote) activeNote = parent || {};
					}else{
						activeNote=tmp;
					}
				}

				var bookid=getState('noteBooks').activeBook.id;

				socket.emit('note.active', {id:note.id,bookid:bookid});

				socket.emit('note.deleteItem',{id:item.id,bookid:bookid});
				arr.splice(index,1);
				return false;
			}
		});

		if(!list.children.length){
			setTimeout(()=>{dispatch('addNote');},10);
		}


		if(activeNote.id){
			dispatch('getNoteDetails',activeNote.id);
		}

		// BUG：删除含有激活子级的父级，会失去激活项目

		return {list,activeNote}
	};
}

export function updateNote(note) {
	return (dispatch, getState) => {
		var {list={children:[]},activeNote={}}=getState();
		tree.each(list,function(item,index,arr) {
			if(item.id===note.id&&note.id) {
				arr[index]=Object.assign({},arr[index],note);
				return false;
			}
		});
		if(activeNote.id===note.id){
			activeNote=Object.assign({},activeNote,note);
		}

		var bookid=getState('noteBooks').activeBook.id;

		socket.emit('note.updateItem',{bookid:bookid,item:{id:note.id,title:note.title,tips:note.tips,content:note.content,leaf:false}});

		return {list,activeNote};
	}
}


export function updateNotes(list) {
	return (dispatch, getState) => {
		var bookid=getState('noteBooks').activeBook.id;
		var notes=JSON.parse(JSON.stringify(list));
		tree.each(notes, function (item, index, arr) {
			delete item.active;
			delete item.content;
		});
		socket.emit('note.updateList',{list:notes,bookid:bookid});
		return {list};
	};
}

export function addNote(note) {
	return (dispatch, getState) => {
		if(typeof note==='undefined') {
			var boxid=getState('boxes').activeBox.id;
			var bookid=getState('noteBooks').activeBook.id;
			socket.emit('note.addItem',{bookid:bookid,boxid:boxid});
		} else {
			var {list={children: []}}=getState();
			tree.each(list, function (item, index, arr) {
				item.active = false;
			});

			note.active=true;
			list.children.unshift(note);

			socket.emit('note.content',note.id);

			return {list, activeNote:note};
		}
	};
}




