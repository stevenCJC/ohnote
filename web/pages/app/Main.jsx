import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import Header from 'cpn/Header';


import './c.less'
import './css.css'




export default class Index extends Component {
	

  render() {
    return (
		<main>
			<Header/>
			<SidebarBooks/>
			<SidebarBooks/>
			<SidebarBoxes/>
			<ContentBody/>
			<Footerbar/>
		</main>
	)
  }
}


