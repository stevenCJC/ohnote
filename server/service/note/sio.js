var tree=require('../../utils/tree');

var boxlist = require('../../daos/boxlist');
var booklist = require('../../daos/booklist');
var notelist = require('../../daos/notelist');
var note = require('../../daos/note');



module.exports = {
	list:function(emit,bookid,session){
		notelist.select(bookid,function(err,notelist_data){
			session.notes=notelist_data;
			emit({'note.list': notelist_data.list});
		});
	},



	addItem:function(emit,data,session){
		var list=session.notes.list;
		for(var i=0;i<list.length;i++) list[i].active = false;
		notelist.addItem({active:true}, session.notes.list, data.bookid, data.boxid, session.user.id, function(err, item){
			emit({'note.addItem':item});
		});
	},

	updateItem:function(emit,data,session){
		var list=session.notes.list;
		var content=data.item.content;
		delete data.item.content;
		tree.each(list,function(item,index,arr,parent) {
			if(item.id===data.item.id) {
				Object.assign(item,data.item,{active:true});
			}else{
				item.active=false;
			}
		});
		note.update(content, data.item.id,function(err){});
		notelist.update(list, data.bookid, function(err){});
	},

	updateList:function(emit,data,session){
		session.notes.list=data.list;
		notelist.update(data.list, data.bookid, function(err){});
	},

	deleteItem:function(emit,data,session){
		var list=session.notes.list,item;
		tree.each(list,function(item,index,arr,parent) {
			if(item.id===data.id) {
				arr.splice(index,1);
				note.delete(item.id);
				return false;
			}
		});
		notelist.update(list, data.bookid, function(err){});
	},

	active:function(emit,data,session){
		var list=session.notes.list;
		tree.each(list,function(item,index,arr,parent) {
			if(item.id===data.id)
				item.active=true;
			else
				item.active=false;

		});
		notelist.update(list, data.bookid, function(err){});
	},

	content:function(emit,id,session){
		//console.log(id);
		note.select(id,function(err,data){
			//console.log(data);
			emit({'note.content':{content:data.content,id:id}});
		});
	},

	updateContent:function(emit,data,session){
		note.update(data.content, data.id,function(err){});
	},

};

