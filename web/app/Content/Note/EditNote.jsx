import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./editNote.less');



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
		this.editor=ReactDOM.findDOMNode(this.refs.editor);
		this.editor.contentEditable=true;
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

					<div ref="editor"
						 className="rich-editor" onKeyDown={this.handleContentChange.bind(this)}></div>

				</section>
			</section>

		)
	}
}


