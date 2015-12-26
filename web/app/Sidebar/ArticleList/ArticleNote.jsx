import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export default class ArticleNote extends Component {
	
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className={(this.props.active?'active':'')}>
                <h3>
                    {this.props.node.title}
                </h3>
                <p>{this.props.node.title}</p>
            </span>
        );
    }
}


