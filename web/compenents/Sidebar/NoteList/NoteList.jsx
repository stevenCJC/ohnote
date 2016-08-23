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
        this.props.dispatch('updateNotes',tree);
    }

    addNewPage(){
        this.props.dispatch('addNote');
    }

    toggleBooksList(){
        this.props.dispatch('toggleBooksList');
    }

    componentDidMount(){

    }

    componentWillReceiveProps(props){
        if(props.activeBook&&this.book.id!==props.activeBook.id){
            this.book=props.activeBook;
        }

        if(!props.activeBook.id&&props.meta.action!=='setActiveNote'){
            this.props.dispatch('setActiveNote',{});
        }

    }

    render() {
        return (
            <section className="sidebar-articleList" style={{backgroundColor:color.base[this.props.activeBook.color]}}>
                <section style={{backgroundColor:color.getLightColor(color.base[this.props.activeBook.color],.9)}}>
                    <div className="tools">
                        <span className={"add-page-btn"+(this.props.activeBook.id?'':' disabled')}
                              onClick={this.props.activeBook.id?this.addNewPage.bind(this):()=>{}}>
                            <i className="icf-add"></i>页面</span>
                    </div>
                    { this.props.activeBook.id &&
                    <Tree
                        delay={150}
                        paddingLeft={15}
                        tree={this.props.list}
                        onChange={this.handleChange.bind(this)}
                        isNodeCollapsed={this.isNodeCollapsed}
                        renderNode={this.renderNode.bind(this)}
                    />
                    }
                </section>
            </section>

        )
    }
}


