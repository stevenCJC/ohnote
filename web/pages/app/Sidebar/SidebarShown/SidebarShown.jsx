import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import Header from './Header/Header';

export default class SidebarShown extends Component {
  render() {
    return (
		<section>
			<header className="header-left js-show-books">
				<span className="show-book-btn"><i className="icon-left"></i></span>
				<span className="crumb-nav">React学习笔记 - Redux基础 </span>
			</header>
			<section>
				
			</section>
		<section>
    )
  }
}


