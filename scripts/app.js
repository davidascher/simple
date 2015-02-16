'use strict';

var React = require('react');
var Editor = require("./editor.jsx");
var Editable = require("./editable.jsx");
var markdown = require('markdown').markdown;

require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/css/bootstrap-theme.min.css");
require("./app.less");



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
    console.log("editEditable", editable, text);
    this.setState({
      editing: true,
      editable:editable,
      text:text
    })
    console.log(text.slice(0,40));
  },
  textChanged: function(value) {
    this.state.editable.updateText({ raw: value })
    this.setState({ raw: value })
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
    var className = this.state.editing ? "container editing" : "container";
    return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
          </div>
        </div>
      </nav>

      <div className="jumbotron">
        <div className="container">
          <h1>Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Editable app={self} raw={self.state.raw} fileName="col1.md"/>
          </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
         </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
          </div>
        </div>
      </div>
      <Editor visible={this.state.editing} 
              text={this.state.text} 
              textChanged={this.textChanged}
              editable={this.state.editable}/>
    </div>
    );
  }
});

// </div>


module.exports = App;