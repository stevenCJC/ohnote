var boxlist = require('../daos/boxlist');
var booklist = require('../daos/booklist');
var notelist = require('../daos/notelist');


module.exports = {
	app_init:function(emit,data,session){
		console.log('--app_init--');
		emit({'user.info': {name:session.user.name}});
		boxlist.select(session.user.id,function(err,boxlist_data){
			//console.log(session.user.id,boxlist_data);
			if(boxlist_data){
				session.boxes=boxlist_data;
				emit({'box.list': {boxes:boxlist_data.list}});
				if(boxlist_data.list[0])
					booklist.select(boxlist_data.list[0].id,function(err,booklist_data){
						session.books=booklist_data;
						emit({'book.list': {books:booklist_data.list}});
						if(booklist_data.list[0])
							notelist.select(booklist_data.list[0].id,function(err,notelist_data){
								session.notes=notelist_data;
								emit({'note.list':notelist_data.list});
							});
					});
			}
		});


	},
};




