import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';


@connect(state=>({text:state.text}))
class Btn extends Component {
	static propTypes = {
	  text:PropTypes.string.isRequired
	}
	
	componentWillReceiveProps(props) {
		//console.log('11',props);
	}
	
	handleClick(){
		this.props.dispatch('incrementIfOdd');
	}
	
  render() {
    const {text} = this.props
    return (
      <button onClick={this.handleClick.bind(this)}>{text}</button>
    )
  }
}

console.log({f:Btn});

@connect(state=>({counter: {n:state.counter.n}}))
export default class Counter3 extends Component {
	static propTypes = {
	  counter: PropTypes.object.isRequired
	}
	
	componentWillReceiveProps(props) {
		
		const el = ReactDOM.findDOMNode(this.refs.btn1);
		//console.log('ReactDOM',{btn1:this.refs.btn1},{el});
		
	}
	
	incrementIfOdd(){
		this.props.dispatch('incrementIfOdd');
	}
	incrementAsync(){
		this.props.dispatch('incrementAsync');
	}
	
  render() {
    const {  counter} = this.props;
    return (
      <p>
        Clicked: {counter.n}  times
        {' '}
        <Btn incrementIfOdd={this.incrementIfOdd.bind(this)} />
        {' '}
        <button onClick={ this.incrementAsync.bind(this) }>Increment async</button>
      </p>
    )
  }
}


