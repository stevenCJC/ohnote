import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('react-ui-tree/dist/react-ui-tree.css');
require('./articleList.less');

var Tree = require('react-ui-tree');
var tree = require('./tree');

import ArticleNote from './ArticleNote';



export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            active: null,
            tree: tree
        };
    }

    renderNode(node) {
        return (
            <ArticleNote active={node === this.state.active} node={node} onclick={this.onClickNode.bind(this, node)} />
        );
    }

    handleChange(tree) {
        this.setState({
            tree: tree
        });
    }


    updateTree() {
        var tree = this.state.tree;
        tree.children.push({module: 'test'});
        this.setState({
            tree: tree
        });
    }

    onClickNode(node) {
        this.setState({
            active: node
        });
    }

    render() {
        return (
            <section className="sidebar-articleList">
                <header></header>
                <section>
                    <div className="tools"></div>
                    <Tree
                        paddingLeft={20}
                        tree={this.state.tree}
                        onChange={this.handleChange.bind(this)}
                        isNodeCollapsed={this.isNodeCollapsed}
                        renderNode={this.renderNode.bind(this)}
                    />
                </section>
            </section>

        )
    }
}


