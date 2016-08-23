import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import color from 'utils/color';

@connect((state)=> {
    let {activeBook={}}=state.noteBooks;
    let {contextMenu={},meta,focus={}}=state.app;
    return {menu:contextMenu,meta,activeBook,focus};
})
export default class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            showMenu:false,
            destroyMenu:true,
            edit:!props.item.name,
        }
    }

    handleContextMenu(e){
        console.log('handleContextMenu',{...e})
        this.props.dispatch('showContextMenu', {item: this.props.item, type: 'book'});

        e.preventDefault();
        e.stopPropagation();
    }

    componentDidMount(){

        if(this.state.edit)
            this.setEdit();
    }

    componentWillReceiveProps(props) {
        var item=props.meta.action=='showContextMenu'?props.menu.item:(props.meta.action=='focus'?props.focus.item:{});
        if(item&&item.id === this.props.item.id){
            if(props.meta.action=='showContextMenu' && props.menu.type === 'book'){
                if (this.state.showMenu) {
                    setTimeout(()=> {
                        this.setState({destroyMenu: true});
                    }, 250);
                    this.setState({showMenu: false});
                } else {
                    this.setState({showMenu: true, destroyMenu: false});
                }
                if (this.state.edit) this.updateBook();
            }
        }else{
            if (this.state.showMenu) {
                setTimeout(()=> {
                    if(this!==window)
                        this.setState({destroyMenu: true});
                }, 250);
                this.setState({showMenu: false});
            } else if (this.state.edit) {
                if(props.meta.action==='focus') this.updateBook();
            }
        }
    }

    hideContextMenu(){
        this.props.dispatch('showContextMenu',false);
    }
    updateBook(){
        let input=ReactDOM.findDOMNode(this.refs.input);
        this.setState({edit:false});
        this.props.dispatch('updateBook',Object.assign({...this.props.item},{name:input.value}));
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
        this.props.dispatch('deleteBook',this.props.item);
        e.stopPropagation();
    }

    handleInputBlur(e){
        this.updateBook();
    }

    handleInputKeyDown(e){
        if(e.keyCode===13){
            this.updateBook();
        }
    }
    handleInputMouseDown(e){
        e.stopPropagation();
    }
    render() {
        //console.log({...this.props.menu})
        return (
            <div onContextMenu={this.handleContextMenu.bind(this)} className={'item-main'+(this.state.showMenu?' showMenu':'')}>
                <span className={'item-body'+(this.props.item.active?' active':'')}>
                        <i style={{backgroundColor:color.base[this.props.item.color]}}></i>

                        <h3 style={{backgroundColor:(this.props.item.active||this.state.showMenu)?color.getLightColor(color.base[this.props.item.color],.9):'#fff'}}>
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


























