import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('utils/react-ui-tree/react-ui-tree.css');
require('./NoteList.less');

var Tree = require('utils/react-ui-tree/index');

var tree = require('./tree');


export default class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            active: null,
            tree: tree
        };
    }

    renderNode(node) {
        return (
            <span className={(this.state.active===node?'active':'')}  onClick={this.onClickNode.bind(this, node)} >
                <h3>
                    {node.title}
                </h3>
                <p>{node.tips}</p>
            </span>
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
                <header>
                    <span className="books-list-btn"><i className="icf-list"></i></span>
                    <h2>学习笔记 - 黄瑞林</h2>
                </header>
                <section>
                    <div className="tools">
                        <span className="add-page-btn"><i className="icf-add"></i>页面</span>

                    </div>
                    <Tree
                        delay={150}
                        paddingLeft={15}
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


