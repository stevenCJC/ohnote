import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./boxes.less');

import Reorder from 'utils/reorderable';

import BoxItem from './BoxItem';

@connect((state)=>{
    let {boxes=[],meta={},activeBox={},close}=state.boxes;
    return {boxes,meta,activeBox,boxClose:close};
})
export default class Boxes extends Component {
      constructor(props) {
        super(props);

      }

    callback(e,data,oldPosition,newPosition,boxes){
        this.props.dispatch('updateBoxes',boxes);
    }

    itemClicked(e,data){
        this.props.dispatch('focus',{type:'box',item:data});
        this.props.dispatch('setActiveBox',data);
    }

    addNewBox(){
        this.props.dispatch('addBox');
    }

    componentDidMount(){
        this.props.dispatch('getBoxes');

    }
    componentWillReceiveProps(props){
    }
  render() {
    return (
        <section className={"sidebar-boxes"+(this.props.boxClose?' close':'')}>
          <header>
            <span className="setting-btn"><i className="icf-setting-o"></i></span>
            <h2>OhNote</h2>
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

