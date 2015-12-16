import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';




@connect(state=>({counter: {n:state.counter.n}}))
export default class Counter2 extends Component {
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
      </p>
    )
  }
}


