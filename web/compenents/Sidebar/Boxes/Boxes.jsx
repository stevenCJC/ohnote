import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./boxes.less');

import Reorder from 'utils/reorderable';

import BoxItem from './BoxItem';

@connect((state)=>{
    let {boxes=[],meta={},activeBox={}}=state.boxes;
    return {boxes,meta,activeBox};
})
export default class Boxes extends Component {
      constructor(props) {
        super(props);

      }

    callback(e,data,oldPosition,newPosition,boxes){
        this.props.dispatch('updateBoxes',boxes);
    }

    itemClicked(e,data){
        if(!e.target.classList.contains('item-delete')&&!e.target.classList.contains('icf-delete')){
            this.props.dispatch('focus',{type:'box',item:data});
            this.props.dispatch('setActiveBox',data);
            this.props.dispatch('getBooks',data.id);
        }
    }

    addNewBox(){
        this.props.dispatch('addBox');
    }

  render() {
    return (
        <section className={"sidebar-boxes"}>
          <header>
            <span className="setting-btn"><i className="icf-setting-o"></i></span>
            <h2>Oh!Note</h2>
          </header>
          <section>
            <div className="tools">
              <span className="add-box-btn" onClick={this.addNewBox.bind(this)}><i className="icf-add"></i>盒子</span>
            </div>
              <Reorder
                  itemKey='id'
                  lock='horizontal'
                  holdTime='200'
                  list={this.props.boxes}
                  template={BoxItem}
                  callback={this.callback.bind(this)}
                  listClass='boxes-list'
                  itemClass='box-item'
                  itemClicked={this.itemClicked.bind(this)}
                  disableReorder={false}/>
          </section>
        </section>

    )
  }
}

