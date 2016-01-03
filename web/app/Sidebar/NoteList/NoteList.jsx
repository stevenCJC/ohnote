import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import color from 'utils/color';

require('utils/react-ui-tree/react-ui-tree.css');
require('./NoteList.less');

var Tree = require('utils/react-ui-tree/index');

var NoteItem = require('./NoteItem');

@connect((state)=>{
    let {list={title:'',children:[]},meta={},activeNote={}}=state.notes;
    let {activeBook={}}=state.noteBooks;
    let {close}=state.boxes;

    return {list,meta,activeNote,activeBook,boxClose:close};
})
export default class NoteList extends Component {
    constructor(props) {
        super(props);
        this.book=props.activeBook;
    }

    renderNode(node) {
        return (<NoteItem item={node} />);
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

    toggleBooksList(){
        if(!this.props.boxClose) this.props.dispatch('toggleBoxesList');
        this.props.dispatch('toggleBooksList');
    }

    componentDidMount(){

    }

    componentWillReceiveProps(props){
        //console.log('meta---',props.meta)//notes的meta
        if(props.activeBook&&this.book.id!==props.activeBook.id){
            this.props.dispatch('getNoteList',props.activeBook);
            this.book=props.activeBook;
        }

        if(props.meta.action=='getNoteList'&&props.activeNote)
            this.props.dispatch('getNoteDetails',props.activeNote);
    }

    render() {
        return (
            <section className="sidebar-articleList" style={{backgroundColor:color.base[this.props.activeBook.color]}}>
                <header onClick={this.toggleBooksList.bind(this)}>
                    <span className="books-list-btn"><i className="icf-list"></i></span>
                    <h2>{this.props.activeBook.name}</h2>
                </header>
                <section style={{backgroundColor:color.getLightColor(color.base[this.props.activeBook.color],.9)}}>
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


