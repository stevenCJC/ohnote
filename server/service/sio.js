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

		/*emit({
			'box.list': {
				boxes: [
					{name: '知识整理积累', id: 991, type: 0, active: true},
					{name: '密码助记', id: 1991, type: 1},
					{name: '任务计划管理', id: 1992, type: 2},
					{name: '人脉管理', id: 1993, type: 3},
				],
				activeBox: {
					name: '知识整理积累', id: 9991, active: true, type: 0
				}
			},
			'note.list': {
				list: {
					children: [{
						id: 661,
						title: 'react入门笔记',
						tips: 'react 安装',
						leaf: false,
						children: [{
							id: 1662,
							title: 'react生命周期',
							tips: 'constructor启动',
							leaf: false
						}, {
							id: 1663,
							title: 'react有用插件积累',
							tips: 'react-ui-tree.cssreact-ui-tree.cssreact-ui-tree.cssreact-ui-tree.css',
							leaf: false
						}, {
							id: 1466,
							title: 'redux学习笔记',
							tips: 'redux 、 reflux 、 flux',
							leaf: false
						}]
					}]
				},
				activeNote: {
					id: 661,
					title: 'react入门笔记',
					tips: 'react 安装',
					leaf: false
				}

			},
			'book.list': {
				books: [
					{name: 'react+redux', id: 1},
					{name: 'html备忘', id: 11},
					{name: 'nodejs', id: 12},
					{name: 'php', id: 113, active: true},
					{name: 'mysql', id: 124, active: 0},
					{name: 'html备忘', id: 125, active: 0},
					{name: 'html备忘', id: 116},
					{name: 'html备忘', id: 27},
					{name: 'JavaScript高级', id: 821},
					{name: 'html备忘', id: 135},
					{name: 'html备忘', id: 1361},
					{name: 'html备忘', id: 237},
					{name: 'JavaScript高级', id: 831},
					{name: 'html备忘', id: 1346},
					{name: 'html备忘', id: 2427},
					{name: 'JavaScript高级', id: 841},
					{name: 'html备忘', id: 145},
					{name: 'html备忘', id: 1246},
					{name: 'html备忘', id: 247},
					{name: 'JavaScript高级', id: 481}
				].map((item, i)=> {
					item.color = i;
					return item;
				}),
				activeBook: {
					name: 'php', id: 113, active: true, color: 3
				}
			}
		});*/
	},
};




