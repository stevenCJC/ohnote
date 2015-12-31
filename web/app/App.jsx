import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';


import '../style/iconfont/iconfont.css';
import './App.less';

import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';


export default class App extends Component {

    constructor(props) {
        super(props);





    }

    reset(){

    }




    componentDidMount() {
        let elem=ReactDOM.findDOMNode(this),
            left=ReactDOM.findDOMNode(this.refs.left),
            right=ReactDOM.findDOMNode(this.refs.right);
        elem.style.height=window.screen.height+'px';
        console.log(elem,window.screen.height,elem.style.height);

        setInterval(function(){
            right.style.width=(document.body.clientWidth-left.clientWidth)+'px';
            right.style.left=left.clientWidth+'px';
        },1000);
        window.addEventListener('resize',function(){
            right.style.width=(document.body.clientWidth-left.clientWidth)+'px';
            right.style.left=left.clientWidth+'px';
        });
    }



    render() {
        return (
            <section className="app">
                <Sidebar ref="left" />
                <Content ref="right" />
            </section>
        )
    }
}


