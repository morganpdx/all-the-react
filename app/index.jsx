var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/App.jsx');

require('./index.css');


// Things a component may need:
// state
// lifecycle events
// ui



ReactDOM.render(
  <App />,
  document.getElementById('battleapp')
);