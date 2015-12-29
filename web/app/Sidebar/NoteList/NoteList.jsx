import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('utils/react-ui-tree/react-ui-tree.css');
require('./NoteList.less');

var Tree = require('utils/react-ui-tree/index');

var tree = require('./tree');

@connect((state)=>{
    let {list={title:'',children:[]},meta={},activeNote={}}=state.notes;
    let {activeBook={}}=state.noteBooks;
    return {list,meta,activeNote,activeBook};
})
export default class NoteList extends Component {
    constructor(props) {
        super(props);
        this.book=props.activeBook;
    }

    renderNode(node) {
        return (
            <span className={(this.props.activeNote.id===node.id?'active':'')}  onClick={this.onClickNode.bind(this, node)} >
                <h3>
                    {node.title}
                </h3>
                <p>{node.tips}</p>
            </span>
        );
    }

    handleChange(tree) {
        this.props.dispatch('updateNoteList',tree);
    }

    onClickNode(node) {
        this.props.dispatch('setActiveNote',node);
        this.props.dispatch('getNoteDetails',node);
    }

    addNewPage(){
        this.props.dispatch('addNote');
    }

    componentDidMount(){
        if(this.props.activeBook&&this.props.activeBook.id)
            this.props.dispatch('getNoteList',this.props.activeBook);
    }

    componentWillReceiveProps(props){
        if(props.activeBook&&this.book.id!==props.activeBook.id){
            this.props.dispatch('getNoteList',props.activeBook);
            this.book=props.activeBook;
        }
    }

    render() {
        console.log('list',{...this.props.list})
        return (
            <section className="sidebar-articleList">
                <header>
                    <span className="books-list-btn"><i className="icf-list"></i></span>
                    <h2>{this.props.activeBook.name}</h2>
                </header>
                <section>
                    <div className="tools">
                        <span onClick={this.addNewPage.bind(this)} className="add-page-btn"><i className="icf-add"></i>页面</span>

                    </div>
                    <Tree
                        delay={150}
                        paddingLeft={15}
                        tree={this.props.list}
                        onChange={this.handleChange.bind(this)}
                        isNodeCollapsed={this.isNodeCollapsed}
                        renderNode={this.renderNode.bind(this)}
                    />
                </section>
            </section>

        )
    }
}


