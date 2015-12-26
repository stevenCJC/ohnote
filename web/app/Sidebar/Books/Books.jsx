import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./books.less');

import Reorder from 'utils/reorderable';

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state= {
      active: null,
        list:[
            {name: 'Item 1'},
            {name: 'Item 2'},
            {name: 'Item 3'}
        ]
    };
  }

    callback(data){
        console.log('callback',arguments);
    }

    itemClicked(data){console.log('itemClicked',arguments);}
    clickedItem(data){console.log('clickedItem',arguments);}

  render() {
    return (
        <section className="sidebar-books">
          <header>
            <span className="boxes-list"><i className="icf-boxes"></i></span>
            <h2>知识整理盒子</h2>
          </header>
          <section>
            <div className="tools">
              <span className="add-page"><i className="icf-add"></i>笔记</span>
            </div>
              <Reorder
                  itemKey='name'
                  lock='horizontal'
                  holdTime='200'
                  list={this.state.list}
                  template={ListItem}
                  callback={this.callback}
                  listClass='my-list'
                  itemClass='list-item'
                  itemClicked={this.itemClicked}
                  selected={this.clickedItem}
                  selectedKey='name'
                  disableReorder={false}/>
          </section>
        </section>

    )
  }
}
class ListItem extends Component {
        render() {
            return (<div>
                {this.props.item.name}
            </div>);
        }
}


