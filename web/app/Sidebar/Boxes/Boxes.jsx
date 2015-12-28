import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

require('./boxes.less');

import Reorder from 'utils/reorderable';
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

    itemClicked(data){
        this.props.dispatch('setActiveBox',data);
    }

    componentDidMount(){
        this.props.dispatch('getBoxes');

    }
    componentWillReceiveProps(props){
        console.log({...props})
    }
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
                  list={this.props.boxes}
                  template={ListItem}
                  callback={this.callback}
                  listClass='boxes-list'
                  itemClass='box-item'
                  itemClicked={this.itemClicked}
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


