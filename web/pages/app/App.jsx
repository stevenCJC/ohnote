import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import Header from './compenents/Header/Header';





export default class Main extends Component {
	

  render() {
    return (
		<main>
			<Header />
		</main>
	)
  }
}


