
export default {books:[],meta:{}};

export function setActiveBook(book) {
	return (dispatch, getState) => {
		var {books=[]}=getState();
		books.forEach((item)=>{
			if(item.id!==book.id)
				item.active=false;
			else item.active=true;
		});
		return { books };
	}
}

export function getBooks() {
	return (dispatch, getState) => {

		return {
			books:[
				{name: 'react+redux',id:1},
				{name: 'html备忘',id:11},
				{name: 'nodejs',id:12},
				{name: 'php',id:113,active:true},
				{name: 'mysql',id:124,active:true},
				{name: 'html备忘',id:125,active:true},
				{name: 'html备忘',id:116},
				{name: 'html备忘',id:27},
				{name: 'JavaScript高级',id:821},
				{name: 'html备忘',id:135},
				{name: 'html备忘',id:1361},
				{name: 'html备忘',id:237},
				{name: 'JavaScript高级',id:831},
				{name: 'html备忘',id:1346},
				{name: 'html备忘',id:2427},
				{name: 'JavaScript高级',id:841},
				{name: 'html备忘',id:145},
				{name: 'html备忘',id:1246},
				{name: 'html备忘',id:247},
				{name: 'JavaScript高级',id:481}
			].map((item,i)=>{item.color=i;return item;})
		};
	}
}


export function deleteBook(book) {
	return (dispatch, getState) => {
		var {books=[]}=getState();
		var index=-1;
		for(let i =0;i<books.length;i++)
			if(books[i].id===book.id) {
				books.splice(i,1);
				break;
			}
		return {books}
	};
}

export function updateBook(book) {
	return (dispatch, getState) => {
		var {books=[]}=getState();
		for(let i =0;i<books.length;i++)
			if(books[i].id===book.id) {
				list[i]=book;
				break;
			}
		return {books};
	};
}

export function addBook() {
	return (dispatch, getState) => {
		var {books=[]}=getState();
		books.unshift({
			id:0,
			name: '',
			color:''
		});
		return {books};
	};
}




