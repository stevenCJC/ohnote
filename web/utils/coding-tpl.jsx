import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';


export default class $ClassName extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){
        React.findDOMNode(this.refs.$elem);
    }



    componentWillRecieveProps(props){

    }


    render() {
        return (
            <section>

            </section>
        )
    }

}


