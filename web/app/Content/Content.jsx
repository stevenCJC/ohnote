import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import './style/c.less'
import './style/css.css'


@connect(state=>({counter: {n:state.counter.n}}))
export default class Counter extends Component {
	static propTypes = {
	  counter: PropTypes.object.isRequired
	}
	
	componentWillReceiveProps(props) {
		
		const el = ReactDOM.findDOMNode(this.refs.btn1);
		//console.log('ReactDOM',{btn1:this.refs.btn1},{el});
		
	}
	
	increment(){
		this.props.dispatch('increment');
	}
	
	incrementIfOdd(){
		this.props.dispatch('incrementIfOdd');
	}
	incrementAsync(){
		this.props.dispatch('incrementAsync');
	}
	
	decrement(){
		this.props.dispatch('decrement');
	}

  render() {
    const {  counter} = this.props;
    return (
      <p>
        Clicked: {counter.n}  times
        {' '}
        <button ref='btn1' onClick={this.increment.bind(this)}>+</button>
        {' '}
        <button onClick={this.decrement.bind(this)}>-</button>
        {' '}
        <Btn incrementIfOdd={this.incrementIfOdd.bind(this)} />
        {' '}
        <button onClick={ this.incrementAsync.bind(this) }>Increment async</button>
		<Link to="/Counter2">Counter2</Link>
		<Link to="/Counter3">Counter3</Link>
      </p>
	  
    )
  }
}


