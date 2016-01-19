var boxlist = require('../../daos/boxlist');
var booklist = require('../../daos/booklist');
var notelist = require('../../daos/notelist');
var note = require('../../daos/note');

module.exports = {
	list:function(emit,data,session){
		boxlist.select(session.user.id,function(err,boxlist_data){
			session.boxes=boxlist_data;
			emit({'box.list':  {boxes:boxlist_data.list}});
		});
	},


	addItem:function(emit,data,session){
		boxlist.addItem({}, session.boxes.list, session.user.id, function(err, item){
			emit({'box.addItem':item});
		});
	},

	updateItem:function(emit,item,session){
		var list=session.boxes.list;
		for(var i=0;i<list.length;i++)if(list[i].id===item.id)
			Object.assign(list[i],item);
		boxlist.update(list, session.user.id, function(err){});
	},

	updateList:function(emit,list,session){
		session.boxes.list=list;
		boxlist.update(list, session.user.id, function(err){});
	},

	deleteItem:function(emit,id,session){
		var list=session.boxes.list,item;
		for(var i=0;i<list.length;i++)if(list[i].id===id){
			item=list[i];
			list.splice(i,1);
			booklist.deleteByBoxid(item.id);
		}
		boxlist.update(list, session.user.id, function(err){});

	},





};




