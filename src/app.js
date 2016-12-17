// React-dnd: http://gaearon.github.io/react-dnd/

import React from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

var Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var cardSource = {
  beginDrag: function (props) {
    // Return the data describing the dragged item
    var item = { id: props.id };
    return item;
  },

  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
    //CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collectDrag(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

export var DragCard = DragSource(Types.CARD, cardSource, collectDrag)(React.createClass({
  render: function () {
    // Your component receives its own props as usual
    var id = this.props.id;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div>
        Drag me!
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}));

var dropCardTarget = {
  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    return true;
  },

  hover: function (props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();

    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    console.log("dropped")
    return { moved: true };
  }
};

function collectDrop(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

export var DropCard = DropTarget(Types.CARD, dropCardTarget, collectDrop)(React.createClass({
  componentWillReceiveProps: function (nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  },

  render: function () {
    // Your component receives its own props as usual
    var position = this.props.position;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div>
        {isOver && canDrop && <div style={{background:'green'}} >status</div>}
        {!isOver && canDrop && <div style={{background:'yellow'}} >status</div>}
        {isOver && !canDrop && <div style={{background:'red'}} >status</div>}
        drop here!
      </div>
    );
  }
}));

var App = DragDropContext(HTML5Backend)(React.createClass({
    render: function() {
        return (
          <div>
            <DragCard />
            <div>...</div>
            <DropCard />
          </div>
        );
    }
}));

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
