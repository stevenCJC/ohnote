import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./books.less');

import Reorder from 'utils/reorderable';

import color from 'utils/color';

export default class Books extends Component {
  constructor(props) {
    super(props);
      var list=
    this.state= {
      active: null,
        list:list
    };
  }

    callback(data){
        console.log('callback',arguments);
    }

    itemClicked(e,data){
        var list= this.state.list;
        if(this.state.active)this.state.active.active=false;
        data.active=true;
        this.setState({active:data});
        console.log('itemClicked',arguments);
    }

  render() {
    return (
        <section className="sidebar-books">
          <header>
            <span className="boxes-list-btn active"><i className="icf-boxes"></i></span>
            <h2>知识整理盒子</h2>
          </header>
          <section>
            <div className="tools">
              <span className="add-book-btn"><i className="icf-add"></i>笔记</span>
            </div>
              <Reorder
                  itemKey='id'
                  lock='horizontal'
                  holdTime='200'
                  list={this.state.list}
                  template={ListItem}
                  callback={this.callback}
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

        console.log(this.props.item.color,color.base[this.props.item.color],color.getLightColor(color.base[this.props.item.color],.5))

        return (<span className={this.props.item.active?'active':''}>
                    <i style={{backgroundColor:color.base[this.props.item.color]}}></i>
            {this.props.item.active ?
                <h3 style={{backgroundColor:color.getLightColor(color.base[this.props.item.color],.9)}}>{this.props.item.name}</h3>: <h3>{this.props.item.name}</h3>  }
                </span>);
    }
}


