import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import Books from './Books/Books';
import Boxes from './Boxes/Boxes';
import NoteList from './NoteList/NoteList';

require('./sidebar.less');

export default class Sidebar extends Component {
	
	
  render() {
    return (
		<section className="sidebar">
			<Boxes />
			<Books />
			<NoteList />
		</section>
    )
  }
}


