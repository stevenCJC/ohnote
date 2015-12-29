import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./books.less');

import Reorder from 'utils/reorderable';

import color from 'utils/color';

@connect((state)=>{
    let {books=[],meta={},activeBook={}}=state.noteBooks;
    let {activeBox={}}=state.boxes;
    return {books,meta,activeBook,activeBox};
})
export default class Books extends Component {
  constructor(props) {
    super(props);
      this.box=props.activeBox;
  }

    callback(e,data,oldPosition,newPosition,books){
        console.log(arguments);
        this.props.dispatch('updateBooks',books);
    }

    itemClicked(e,data){
        this.props.dispatch('setActiveBook',data);
    }
    addNewBook(){
        this.props.dispatch('addBook');
    }

    componentDidMount(){
        if(this.props.activeBox&&this.props.activeBox.id)
            this.props.dispatch('getBooks',this.props.activeBox);
    }

    componentWillReceiveProps(props){
        if(props.activeBook&&this.box.id!==props.activeBox.id){
            this.props.dispatch('getBooks',props.activeBox);
            this.box=props.activeBox;
        }
    }

  render() {
    return (
        <section className="sidebar-books">
          <header>
            <span className="boxes-list-btn active"><i className="icf-boxes"></i></span>
            <h2>{this.props.activeBox.name}</h2>
          </header>
          <section>
            <div className="tools">
              <span className="add-book-btn" onclick={this.addNewBook.bind(this)}><i className="icf-add"></i>笔记</span>
            </div>
              <Reorder
                  itemKey='id'
                  lock='horizontal'
                  holdTime='200'
                  list={this.props.books}
                  template={ListItem}
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
class ListItem extends Component {
    constructor(props){
        super(props);
        this.colorIndex=(this.props.item.index%20+1).toString();
        if(this.colorIndex.length===1)this.colorIndex='0'+this.colorIndex;
    }

    render() {

        return (<span className={this.props.item.active?'active':''}>
                    <i style={{backgroundColor:color.base[this.props.item.color]}}></i>
            {this.props.item.active ?
                <h3 style={{backgroundColor:color.getLightColor(color.base[this.props.item.color],.9)}}>{this.props.item.name}</h3>: <h3>{this.props.item.name}</h3>  }
                </span>);
    }
}


