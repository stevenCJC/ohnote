import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import color from 'utils/color';

@connect((state)=> {
    let {activeBox={}}=state.boxes;
    let {contextMenu={},meta,focus={}}=state.app;
    return {menu:contextMenu,meta,activeBox,focus};
})
export default class BoxItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            showMenu:false,
            destroyMenu:true,
            edit:!props.item.name
        }
    }

    handleContextMenu(e){
        this.props.dispatch('showContextMenu', {item: this.props.item, type: 'box'});

        e.preventDefault();
        e.stopPropagation();
    }

    componentDidMount(){

        if(this.state.edit)
            this.setEdit();

    }

    componentWillReceiveProps(props) {

        var item=props.meta.action=='showContextMenu'?props.menu.item:props.focus.item;
        if(item.id === this.props.item.id && props.meta.action=='showContextMenu'){
            if(props.meta.action=='showContextMenu' && props.menu.type === 'box'){
                if (this.state.showMenu) {
                    setTimeout(()=> {
                        this.setState({destroyMenu: true});
                    }, 250);
                    this.setState({showMenu: false});
                } else {
                    this.setState({showMenu: true, destroyMenu: false});
                }
                if (this.state.edit) this.updateBox();
            }
        }else{
            if (this.state.showMenu) {
                setTimeout(()=> {
                    this.setState({destroyMenu: true});
                }, 250);
                this.setState({showMenu: false});
            } else if (this.state.edit) {
                if(props.meta.action==='focus') this.updateBox();
            }
        }

        /*if(props.meta.action=='showContextMenu' && props.menu.item.id === this.props.item.id && props.menu.type === 'box' ){
            if(this.state.showMenu){
                setTimeout(()=> {
                    this.setState({destroyMenu: true});
                }, 250);
                this.setState({showMenu: false});
            }else {
                this.setState({showMenu: true, destroyMenu: false});
            }
            if (this.state.edit) this.updateBox();
        }else if(this.state.showMenu){
            setTimeout(()=> {
                this.setState({destroyMenu: true});
            }, 250);
            this.setState({showMenu: false});
        }else if( this.state.edit){
            if(this.state.edit) this.updateBox();
        }*/

        /*if(props.meta.action=='showContextMenu') {
            if (props.menu.type === 'box' && props.menu.item.id === this.props.item.id) {
                this.setState({showMenu: true, destroyMenu: false});
            } else if (this.state.showMenu) {
                setTimeout(()=> {
                    this.setState({destroyMenu: true});
                }, 250);
                this.setState({showMenu: false});
            }
            if(this.state.edit) this.updateBox();
        }else if(props.meta.action==='focus'&&(this.state.showMenu || this.state.edit)){
            if (props.focus.type !== 'box' || props.focus.item.id !== this.props.item.id) {
                if(this.state.showMenu){
                    setTimeout(()=> {
                        this.setState({destroyMenu: true});
                    }, 250);
                    this.setState({showMenu: false});
                }else if(this.state.edit){
                    this.updateBox();
                }
            }
        }*/
    }

    hideContextMenu(){
        this.props.dispatch('showContextMenu',false);
    }
    updateBox(){
        let input=ReactDOM.findDOMNode(this.refs.input);
        this.setState({edit:false});
        this.props.dispatch('updateBox',Object.assign({...this.props.item},{name:input.value}));
    }

    handleEdit(e){
        this.hideContextMenu();
        this.setState({edit:true});
        setTimeout(()=>{
            this.setEdit();
        },50);
    }
    setEdit(){
        let input=ReactDOM.findDOMNode(this.refs.input);
        input.value=this.props.item.name;
        input.select();
        input.focus();
    }
    handleDelete(e){
        this.props.dispatch('deleteBox',this.props.item);
    }

    handleInputBlur(e){
        this.updateBox();
    }

    handleInputKeyDown(e){
        if(e.keyCode===13){
            this.updateBox();
        }
    }
    handleInputMouseDown(e){
        e.stopPropagation();
    }

    render() {
        //console.log({...this.props.menu})
        return (
            <div onContextMenu={this.handleContextMenu.bind(this)} className={'item-main'+(this.state.showMenu?' showMenu':'')}>
                <span className={'item-body'+((this.props.item.active||this.state.showMenu)?' active':'')}>
                    <i></i>
                    <span><i className="icf-books"></i></span>
                    <h3>
                        {this.state.edit?
                            <input ref="input" type="text"
                                   onMouseDown={this.handleInputMouseDown.bind(this)}
                                   onTouchStart={this.handleInputMouseDown.bind(this)}
                                   onKeyDown={this.handleInputKeyDown.bind(this)}
                                   onBlur={this.handleInputBlur.bind(this)}
                            />
                            :this.props.item.name}</h3>

                </span>
                {!this.state.destroyMenu &&
                    <span className={"item-setting" + (!this.state.showMenu?' destroyMenu':'')}>
                        <span className="item-edit" onClick={this.handleEdit.bind(this)}><i className="icf-edit"></i></span>
                        <span className="item-delete" onClick={this.handleDelete.bind(this)}><i className="icf-delete"></i></span>
                    </span>
                }
        </div>);
    }
}


























