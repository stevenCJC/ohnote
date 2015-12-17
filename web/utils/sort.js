'use strict';

var React = require('react');
import ReactDOM from 'react-dom';
var Reorder = require('cpn/react-nicesort');

import './index.less';

var ListItem = React.createClass({
  render: function () {
    return React.createElement('div', {
      className: 'inner',
      style: {
        color: this.props.item.color
      }
    }, this.props.sharedProps ? this.props.sharedProps.prefix : undefined, this.props.item.name);
  }
});

var Main = React.createClass({
  callback: function (event, item, index, newIndex, list) {
    this.setState({arr: list});
  },
  itemClicked: function (event, item) {
    this.setState({
      clickedItem: item === this.state.clickedItem ? undefined : item
    });
  },
  itemClicked2: function (event, item) {
    this.setState({clickedItem2: item});
  },
  disableToggled: function () {
    this.setState({disableReorder: !this.state.disableReorder});
  },
  prefixChanged: function (event) {
    var target = event.currentTarget;
    this.setState({prefix: target.value});
  },

  // ----

  getInitialState: function () {
    var list = [];

    for (var i = 0; i < 10; i += 1) {
      list.push({name: ['Thing', i].join(' '), color: ['rgb(',(i + 1) * 25, ',', 250 - ((i + 1) * 25),',0)'].join('')});
    }

    return {
      arr: list,
      prefix: 'Prefix'
    };
  },
  render: function () {
    return React.createElement('div', {className: 'app'},

     
      React.createElement('p', null,
        'Reorder disabled: ',
        React.createElement('input', {
          type: 'checkbox',
          onChange: this.disableToggled,
          value: this.state.disableReorder || false
        }),
        'Last item clicked: ',
        this.state.clickedItem2 ? this.state.clickedItem2.name : undefined
      ),

      React.createElement(Reorder, {
        itemKey: 'name',
        lock: 'vertical',
        holdTime: '250',
        list: this.state.arr,
        template: ListItem,
        callback: this.callback,
        listClass: 'my-list-2',
        itemClass: 'list-item',
        itemClicked: this.itemClicked2,
        disableReorder: this.state.disableReorder})

     
    );
  }
});

export default Main;
