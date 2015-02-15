'use strict';

var React = require('react');
// var Markdown = require("./markdownfile.jsx");
var Editable = require("./editable.jsx");
var content = "Content";
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/css/bootstrap-theme.min.css");

var App = React.createClass({
  render() {
    return (
      <div className="container">
        <button className="btn btn-primary">foo</button>
        <h1>Hello, world.</h1>
        <Editable fileName="heartbeats.md"/>
      </div>
    );
  }
});

module.exports = App;