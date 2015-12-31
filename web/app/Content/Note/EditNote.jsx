import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import 'utils/ueditor/third-party/zeroclipboard/ZeroClipboard.min';
import 'utils/ueditor/third-party/codemirror/codemirror';
import 'utils/ueditor/ueditor.config';
import 'utils/ueditor/ueditor.all';
import 'utils/ueditor/lang/zh-cn/zh-cn';


import 'utils/ueditor/third-party/codemirror/codemirror.css';



require('./editNote.less');
import 'utils/ueditor/themes/default/css/ueditor.css';


@connect((state)=>{
	let {meta={},activeNote={}}=state.notes;
	return {meta,activeNote};
})
export default class EditNote extends Component {
	constructor(props) {
		super(props);
		this.state={};
	}

	handleTitleChange(e){
		this.setState({
			title:e.target.value
		});
		this.note.title=e.target.value;
		this.props.dispatch('updateNote',{...this.note});
	}
	handleContentChange(e){
		var target=e.target;
		setTimeout(()=>{
			this.setState({
				content:target.innerHTML
			});
			this.note.content=target.innerHTML;

			var text=(target.innerText||'').trim();
			text=/[^\n\r]*/.exec(text)[0];
			text=text.trim().substr(0,100).trim();
			console.log('innerText',text);
			this.note.tips=text;
			this.props.dispatch('updateNote',{...this.note});
			console.log({...this.note});
		},0);

	}



	componentDidMount(){
		///this.editor=ReactDOM.findDOMNode(this.refs.editor);
		///this.editor.contentEditable=true;
		var ue = UE.getEditor('richEditor',{
			UEDITOR_HOME_URL:'http://localhost:3000/ueditor/',
			autoFloatEnabled : false,
			wordCount:false, //关闭字数统计
			elementPathEnabled:false,//关闭elementPath
			initialFrameHeight: 500,
			toolbars:[[
				'undo', 'redo','|','insertcode',
				'simpleupload', 'insertimage', 'emotion', 'scrawl',  'attachment','|',
				'map', 'gmap','searchreplace'

			]],
			shortcutMenu:[ "fontfamily", "fontsize",'removeformat','fontborder', 'strikethrough', "bold", "italic", "underline", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist", 'justifyleft', 'justifycenter', 'justifyright','link', 'unlink'],
			enableContextMenu: true,
			contextMenu:[
				{
					label:'全选',
					cmdName:'selectall',
				},{
					label:'搜索|替换',
					cmdName:'searchreplace',
				},
				{
					label:'复制',
					cmdName:'copy',
				},
				{
					label:'插入代码',
					cmdName:'insertcode'
				},{
					label:'插入分割线',
					cmdName:'horizontal'
				},
				{
					label:'字母转大写',
					cmdName:'touppercase'
				},
				{
					label:'字母转小写',
					cmdName:'tolowercase',
				},
			]
		});

		ue.ready(function(){

			ue.setContent('', true);

		});
	}

	componentWillReceiveProps(props){
		if(props.meta.action==='getNoteDetails') {
			this.note = props.activeNote;
			this.setState({
				title: this.note.title,
				content: this.note.content
			});
			this.editor.innerHTML=this.note.content;
		}
	}

	render() {
		return (
			<section className="edit-note">
				<header>
					<input ref="title" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
				</header>
				<section>

					<div ref="editor" id="richEditor"
						 className="rich-editor"></div>

				</section>
			</section>

		)
	}
}


