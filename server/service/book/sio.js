var boxlist = require('../../daos/boxlist');
var booklist = require('../../daos/booklist');
var notelist = require('../../daos/notelist');
var note = require('../../daos/note');

module.exports = {
	list:function(emit,boxid,session){
		//console.log('book.list',boxid);
		booklist.select(boxid,function(err,booklist_data){
			session.books=booklist_data;
			emit({'book.list': {books:booklist_data.list}});
		});
	},



	addItem:function(emit,data,session){
		booklist.addItem({}, session.books.list, data.boxid, session.user.id, function(err, item){
			emit({'book.addItem':item});
		});
	},

	updateItem:function(emit,data,session){
		var list=session.books.list;
		for(var i=0;i<list.length;i++) if(list[i].id===data.item.id)
			Object.assign(list[i],data.item);
		booklist.update(list, data.boxid, function(err){});
	},

	updateList:function(emit,data,session){
		session.books.list=data.list;
		booklist.update(data.list, data.boxid, function(err){});
	},

	deleteItem:function(emit,data,session){
		var list=session.books.list,item;
		for(var i=0;i<list.length;i++)if(list[i].id===data.id){
			item=list[i];
			list.splice(i,1);
			notelist.deleteByBookid(item.id);
		}
		booklist.update(list, data.boxid, function(err){});

	},





};

