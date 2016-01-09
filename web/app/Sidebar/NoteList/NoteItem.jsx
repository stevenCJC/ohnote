import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import color from 'utils/color';

require('utils/react-ui-tree/react-ui-tree.css');
require('./NoteList.less');

var Tree = require('utils/react-ui-tree/index');

@connect((state)=>{
    let {activeNote={}}=state.notes;
    let {contextMenu={},meta,focus={}}=state.app;
    return {menu:contextMenu,meta,activeNote,focus};
})
export default class NoteItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            showMenu:false,
            destroyMenu:true
        }
        //this.item=props.item;
    }

    handleContextMenu(e){
        //console.log('handleContextMenu',{...e})
        this.props.dispatch('showContextMenu', {item: this.props.item, type: 'noteItem'});
        e.preventDefault();
        e.stopPropagation();
    }

    handleDelete(e){
        this.props.dispatch('deleteNote',this.props.item);
    }


    onClickNode() {
        this.props.dispatch('focus',{type:'noteItem',item:this.props.item});
        this.props.dispatch('setActiveNote',this.props.item);
        this.props.dispatch('getNoteDetails',this.props.item);
    }


    componentDidMount(){

    }

    componentWillReceiveProps(props) {
        var item=props.meta.action=='showContextMenu'?props.menu.item:(props.meta.action=='focus'?props.focus.item:{});
        if(item.id === this.props.item.id){
            if(props.meta.action=='showContextMenu' && props.menu.type === 'noteItem'){
                if (this.state.showMenu) {
                    setTimeout(()=> {
                        this.setState({destroyMenu: true});
                    }, 250);
                    this.setState({showMenu: false});
                } else {
                    this.setState({showMenu: true, destroyMenu: false});
                }
            }
        }else{
            if (this.state.showMenu) {
                setTimeout(()=> {
                    this.setState({destroyMenu: true});
                }, 250);
                this.setState({showMenu: false});
            }
        }
    }

    render() {
        return (
            <div  className={'item-main'+(this.state.showMenu?' showMenu':'')} onContextMenu={this.handleContextMenu.bind(this)}>
                <span style={{borderColor:this.props.activeNote.id===this.props.item.id?'#fff':'rgba(0,0,0,.1)'}} className={'item-body'+(this.props.activeNote.id===this.props.item.id?' active':'')}  onClick={this.onClickNode.bind(this)} >
                    <h3>
                        {this.props.item.title||'无标题'}
                    </h3>
                    <p>{this.props.item.tips}</p>
                </span>
                {!this.state.destroyMenu &&
                <span className={"item-setting" + (!this.state.showMenu?' destroyMenu':'')}>
                    <span className="item-delete" onClick={this.handleDelete.bind(this)}><i className="icf-delete"></i></span>
                </span>
                }
            </div>
        );
    }
}


