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
		this.note=props.activeNote;
	}

	componentDidMount(){

	}

	componentWillReceiveProps(props){

	}

	render() {
		return (
			<section className="edit-note">
				<header>
					{this.props.activeNote.title}
				</header>
				<section>
					{this.props.activeNote.content}
				</section>
			</section>

		)
	}
}


