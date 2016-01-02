import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./books.less');

import Reorder from 'utils/reorderable';

import color from 'utils/color';

import BookItem from './BookItem';

@connect((state)=> {
    let {books=[],meta={},activeBook={}}=state.noteBooks;
    let {activeBox={},close=true}=state.boxes;
    return {books, meta, activeBook, activeBox,boxClose:close,bookClose:state.noteBooks.close};
})
export default class Books extends Component {
    constructor(props) {
        super(props);
        this.box = props.activeBox;
    }

    callback(e, data, oldPosition, newPosition, books) {
        ///console.log(arguments);
        this.props.dispatch('updateBooks', books);
    }

    itemClicked(e, data) {
        this.props.dispatch('focus',{type:'book',item:data});
        this.props.dispatch('setActiveBook', data);
    }

    addNewBook() {
        this.props.dispatch('addBook');
    }

    toggleBooksList(){
        this.props.dispatch('toggleBoxesList');
    }

    componentDidMount() {
        if (this.props.activeBox && this.props.activeBox.id)
            this.props.dispatch('getBooks', this.props.activeBox);
    }

    componentWillReceiveProps(props) {
        if (props.activeBox && this.box.id !== props.activeBox.id) {
            this.props.dispatch('getBooks', props.activeBox);
            this.box = props.activeBox;
        }
    }

    render() {
        return (
            <section className={"sidebar-books"+(this.props.bookClose?' close':'')} >
                <header  onClick={this.toggleBooksList.bind(this)}>
                    <span className={'boxes-list-btn '+(this.props.boxClose?'':'active') }><i className="icf-boxes"></i></span>
                    <h2>{this.props.activeBox.name}</h2>
                </header>
                <section>
                    <div className="tools">
                        <span className="add-book-btn" onClick={this.addNewBook.bind(this)}><i className="icf-add"></i>笔记</span>
                    </div>
                    <Reorder
                        itemKey='id'
                        lock='horizontal'
                        holdTime='200'
                        list={this.props.books}
                        template={BookItem}
                        callback={this.callback.bind(this)}
                        listClass='books-list'
                        itemClass='book-item'
                        itemClicked={this.itemClicked.bind(this)}
                        disableReorder={false}/>
                </section>
            </section>
        )
    }
}


