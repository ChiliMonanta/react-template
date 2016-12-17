import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

var App = React.createClass({
  onClick: function() {
    console.log("click");
  },

  render: function() {
    return (
      <div>
        <Button onClick={this.onClick}>Press me</Button>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
