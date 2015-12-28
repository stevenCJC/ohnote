import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./books.less');

import Reorder from 'utils/reorderable';

export default class Books extends Component {
  constructor(props) {
    super(props);
      var list=[
          {name: 'react+redux',id:1},
          {name: 'html备忘',id:11},
          {name: 'nodejs',id:12},
          {name: 'php',id:13},
          {name: 'mysql',id:14},
          {name: 'html备忘',id:15},
          {name: 'html备忘',id:16},
          {name: 'html备忘',id:27},
          {name: 'JavaScript高级',id:821},
          {name: 'html备忘',id:135},
          {name: 'html备忘',id:136},
          {name: 'html备忘',id:237},
          {name: 'JavaScript高级',id:831},
          {name: 'html备忘',id:136},
          {name: 'html备忘',id:247},
          {name: 'JavaScript高级',id:841},
          {name: 'html备忘',id:145},
          {name: 'html备忘',id:146},
          {name: 'html备忘',id:247},
          {name: 'JavaScript高级',id:481}
      ].map((item,i)=>{item.index=i;return item;})
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
        render() {
            console.log(this.props)
            return (<span className={this.props.item.active?'active':''}>
                        <i className={"dark-bgc-0"+(this.props.item.index+1)}></i>
                        <h3>{this.props.item.name}</h3>
                    </span>);
        }
}


