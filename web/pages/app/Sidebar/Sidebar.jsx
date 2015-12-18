import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import Header from './SidebarShown/SidebarShown';
import Header from './SidebarHidden/SidebarHidden';


export default class Counter extends Component {
	
	
  render() {
    const {  counter} = this.props;
    return (
		<section>
			<SidebarShown />
			<SidebarHidden />
		</section>
    )
  }
}


