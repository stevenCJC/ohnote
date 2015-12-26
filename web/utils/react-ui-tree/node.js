'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Node = React.createClass({
  displayName: 'UITreeNode',

  renderCollapse: function renderCollapse() {
    var index = this.props.index;

    if (index.children && index.children.length) {
      var collapsed = index.node.collapsed;

      return React.createElement('span', {
        className: 'collapse '+ (collapsed ? 'caret-right' : 'caret-down'),
        onMouseDown: function (e) {
          e.stopPropagation();
        },
        onClick: this.handleCollapse });
    }

    return null;
  },

  renderChildren: function renderChildren() {
    var _this = this;

    var index = this.props.index;
    var tree = this.props.tree;
    var dragging = this.props.dragging;
    var delay=this.props.delay;

    if (index.children && index.children.length) {
      var childrenStyles = {};
      if (index.node.collapsed) childrenStyles.display = 'none';
      childrenStyles['paddingLeft'] = this.props.paddingLeft + 'px';

      return React.createElement(
        'div',
        { className: 'children', style: childrenStyles },
        index.children.map(function (child) {
          var childIndex = tree.getIndex(child);
          return React.createElement(Node, {
            tree: tree,
            index: childIndex,
            key: childIndex.id,
            dragging: dragging,
            delay:delay,
            paddingLeft: _this.props.paddingLeft,
            onCollapse: _this.props.onCollapse,
            onDragStart: _this.props.onDragStart
          });
        })
      );
    }

    return null;
  },

  render: function render() {
    var tree = this.props.tree;
    var index = this.props.index;

    var dragging = this.props.dragging;
    var node = index.node;
    var styles = {};

    return React.createElement(
      'div',
      { className: 'm-node '+ (index.id === dragging?'placeholder':''), style: styles },
      React.createElement(
        'div',
        { className: 'inner', ref: 'inner',
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseOut: this.handleMouseOut
        },
        this.renderCollapse(),
        tree.renderNode(node)
      ),
      this.renderChildren()
    );
  },

  handleCollapse: function handleCollapse(e) {
    e.stopPropagation();
    var nodeId = this.props.index.id;
    if (this.props.onCollapse) this.props.onCollapse(nodeId);
  },

  handleMouseDown: function handleMouseDown(e) {
    var delay= this.props.delay;
    var nodeId = this.props.index.id;
    var dom = this.refs.inner;
    this.holding=true;
    var ev={...e};
    setTimeout(()=>{
      if (this.props.onDragStart&& this.holding) {
        this.props.onDragStart(nodeId, dom, ev);
      }
    },delay);
  },
  handleMouseUp: function handleMouseUp(e) {
    this.holding=false;
  },
  handleMouseOut: function handleMouseOut(e) {
    this.holding=false;
  }
});

module.exports = Node;