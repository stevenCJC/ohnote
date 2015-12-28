import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./boxes.less');

import Reorder from 'utils/reorderable';

export default class Boxes extends Component {
  constructor(props) {
    super(props);
    this.state= {
      active: null,
        list:[
            {name: '知识整理积累',id:1},
            {name: '密码助记',id:11},
            {name: '任务计划管理',id:12},
            {name: '人脉管理',id:13},
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
        <section className="sidebar-boxes">
          <header>
            <span className="setting-btn"><i className="icf-setting-o"></i></span>
            <h2>OhNote</h2>
          </header>
          <section>
            <div className="tools">
              <span className="add-box-btn"><i className="icf-add"></i>笔记</span>
            </div>
              <Reorder
                  itemKey='id'
                  lock='horizontal'
                  holdTime='200'
                  list={this.state.list}
                  template={ListItem}
                  callback={this.callback}
                  listClass='boxes-list'
                  itemClass='box-item'
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
            console.log(this.props);
            return (<span>
                        <i></i>
                        <span><i className="icf-books"></i></span>
                        <h3>{this.props.item.name}</h3>
                    </span>);
        }
}


