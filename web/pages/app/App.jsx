import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import '../../style/iconfont/iconfont.css';

import './App.less';
import Demo from 'utils/reorder/Demo';


export default class App extends Component {
	

  render() {
    return (
		<main>
			<Demo />
		</main>
	)
  }
}


