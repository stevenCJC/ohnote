import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';


import '../style/iconfont/iconfont.css';
import './App.less';

import Sidebar from './Sidebar/Sidebar';
import Sidebar from './Content/Content';


export default class App extends Component {

    constructor(props) {
        super(props);

    }



    componentDidMount() {
        let elem=ReactDOM.findDOMNode(this);
        elem.style.height=window.screen.height+'px';
        console.log(elem,window.screen.height,elem.style.height);

    }

    render() {
        return (
            <section className="app">
                <Sidebar />
                <Content />
            </section>
        )
    }
}


