'use strict';

var React = require('react');
// var Markdown = require("./markdownfile.jsx");
var {Editable, Editor} = require("./editable.jsx");
var content = "Content";
var markdown = require('markdown').markdown;

require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/css/bootstrap-theme.min.css");

var App = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      editable: {
        raw:""
      }
    }
  },
  editEditable: function(editable, text) {
    this.setState({
      editing: true,
      editable:editable,
      text:text
    })
    console.log(text.slice(0,40));
  },
  textChanged: function(value) {
    this.setState({ text: markdown.toHTML(value) })
    // Figure out state management here.
  },
  dismissEditor: function(value) {
    this.setState({editing:false});
    // Figure out state management here.
  },
  onKeyDown: function(event) {
    console.log("EVENT", event);
    if (event.keyCode === 13) {
      this.props.dismissEditor(event);
    }
  },
  render() {
    var self = this;
    return (
      <div className="container">
        <Editable app={self} 
                  text={this.state.text} 
                  fileName="heartbeats.md"/>
        <Editor visible={this.state.editing} 
                text={this.state.text} 
                textChanged={this.textChanged}
                editable={this.state.editable}/>
      </div>
    );
  }
});

module.exports = App;