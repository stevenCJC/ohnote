import color from 'utils/color';
import {redux2} from 'redux2';

export default {books:[],meta:{},activeBook:{},close:false};


socket({
	'book.list': function (data) {
		redux2.dispatch('getBooks', data);
	},
	'book.addItem':function(item){
		redux2.dispatch('addBook', item);
	}
});

export function toggleBooksList(show) {
	return (dispatch, getState) => {
		var {close}=getState();
		if(typeof show!=='undefined')
			return { close:!!show };
		else
			return { close:!close };
	}
}

export function setActiveBook(book) {
	if(!book.id) return {activeBook:book};
	return (dispatch, getState) => {
		var {books=[],activeBook={}}=getState();
		books.forEach((item)=>{
			if(item.id!==book.id)
				item.active=false;
			if(item.id===book.id){
				item.active=true;
				activeBook=item;
			}
		});
		socket.emit('book.active', activeBook.id);
		return { books, activeBook};
	}
}

export function getBooks(list) {
	return (dispatch, getState) => {
		if(typeof list!=='object') {
			var boxid=getState('boxes').activeBox.id;
			socket.emit('book.list',boxid);
		}else{
			list.activeBook=null;

			for(var i=0,l=list.length;i<l;i++)
				if(list.books[i].active) list.activeBook=list.books[i];

			if(!list.activeBook && list.books[0]){
				list.activeBook=list.books[0];
				list.activeBook.active=true;

			}else list.activeBook={};

			if(list.activeBook) socket.emit('note.list', list.activeBook.id);

			return list;
		}
	}
}


export function deleteBook(book) {
	return (dispatch, getState) => {
		var {books=[]}=getState();
		var boxid=getState('boxes').activeBox.id;
		var index=-1,activeBook;
		for(let i = 0;i<books.length;i++) {
			if (books[i].id === book.id) {
				if(i>0) activeBook=books[i-1];
				else  activeBook=books[1];
				if(activeBook) activeBook.active=true;
				books.splice(i, 1);
				break;
			}
		}
		if(activeBook&&activeBook.id){
			socket.emit('note.list', activeBook.id);
		}else {
			activeBook={};
		}
		socket.emit('book.active', activeBook.id);
		socket.emit('book.deleteItem',{id:book.id,boxid:boxid});
		return {books:[...books],activeBook};
	};
}

export function updateBook(book) {
	return (dispatch, getState) => {
		if(!book.name&&typeof book.name!='undefined') book.name='~';
		var {books=[],activeBook={}}=getState();
		for(let i =0;i<books.length;i++)
			if(books[i].id===book.id) {
				books[i]=Object.assign({},books[i],book);
				break;
			}
		if(activeBook.id===book.id){
			activeBook=Object.assign({},activeBook,book);
		}

		var boxid=getState('boxes').activeBox.id;

		socket.emit('book.updateItem',{boxid:boxid,item:{id:book.id,name:book.name,color:book.color}});
		return {books:[...books],activeBook};
	};
}

export function updateBooks(books) {
	return (dispatch, getState) => {
		var boxid=getState('boxes').activeBox.id;
		var booklist=[];
		books.forEach(function(item){
			booklist.push({id:item.id,name:item.name,color:item.color});
		});
		socket.emit('book.updateList',{list:booklist,boxid:boxid});
		return {books};
	};
}

export function addBook(book) {
	return (dispatch, getState) => {
		if(typeof book!=='object') {
			var boxid=getState('boxes').activeBox.id;
			socket.emit('book.addItem',{boxid:boxid});
		}
		else {
			var {books=[]}=getState();
			books.forEach((item)=> {
				item.active = false;
			});
			book.edit=true;
			book.active=true;
			books.unshift(book);
			socket.emit('note.list', book.id);
			return {books: [...books], activeBook: book};
		}
	};
}




