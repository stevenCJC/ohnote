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

				var activeBox;

				emit({'box.list': {boxes:boxlist_data.list}});

				session.boxes=boxlist_data;
				for(var i=0,l=boxlist_data.list.length;i<l;i++) if(boxlist_data.list[i].active) activeBox=boxlist_data.list[i];
				if(!activeBox && boxlist_data.list[0]) activeBox=boxlist_data.list[0];
				if(activeBox)
					booklist.select(activeBox.id,function(err,booklist_data){
						var activeBook;
						session.books=booklist_data;
						emit({'book.list': {books:booklist_data.list}});
						for(var i=0,l=booklist_data.list.length;i<l;i++) if(booklist_data.list[i].active) activeBook=booklist_data.list[i];
						if(!activeBook && booklist_data.list[0]) activeBook=booklist_data.list[0];
						if(activeBook)
							notelist.select(activeBook.id,function(err,notelist_data){
								session.notes=notelist_data;
								emit({'note.list':notelist_data.list});
							});
					});
			}
		});


	},
};




