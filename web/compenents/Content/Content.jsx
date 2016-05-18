import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import EditNote from './Note/EditNote';

require('./content.less');

export default class Content extends Component {


	render() {
		return (
			<section className="content">
				<EditNote />
			</section>
		)
	}
}


