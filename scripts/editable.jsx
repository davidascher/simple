var React = require('react');
var Markdown = require('./markdownfile.jsx');
var markdown = require('markdown').markdown;
var Draggable = require('react-draggable');
var ResizableBox = require('react-resizable').ResizableBox;

require("./editable.less");

var EditorButton = React.createClass({
  onClick: function(event) {
    event.preventDefault();
    console.log("got click", this.props.icon);
  },
  render: function() {
    var classnames = "editor-button fa fa-" + this.props.icon;
    return (
      <i className={classnames} onClick={this.onClick}/>
    );
  }
});

var Editor = React.createClass({
  getInitialState:function() {
    return {blurred:false};
  },
  onChange: function(event) {
    this.setState({text: event.target.value});
    this.props.textChanged(event.target.value);
  },
  onKeyPress: function(event) {
    this.props.textChanged(event.target.value);
  },
  onMouseDown: function(event) {

  },
  onMouseMove: function(event) {
    // console.log(event);
  },
  onBlur: function(event) {
    console.log("got blur event");
    this.setState({blurred:true})
  },
  onFocus: function(event) {
    console.log("got focus event");
    this.setState({blurred:false})
  },
  render: function() {
    var editorStyle = {
      display: this.props.visible == true ? "block" : "none",
    }
    var classes = "editor-container ";
    if (this.props.visible) {
      classes = classes + "active";
    } else {
      classes = classes + "collapsed";
    }
    var text = this.state.text || this.props.text;
    return (
      <div className={classes}>
        <div style={editorStyle} className="editor">
          <div className="editor-background"/>
          <div className="toolbar" onMouseDown={this.onMouseDown}>
            <EditorButton icon="header"/>
            <EditorButton icon="bold"/>
            <EditorButton icon="italic"/>
          </div>
          <textarea value={text} 
                    onChange={this.onChange} 
                    onKeyPress={this.onKeyPress} 
                    className="inputfield"></textarea>
        </div>
      </div>
    );
  }
});

var Editable = React.createClass({
  getInitialState: function() {
    var data = require("../content/"+this.props.fileName);
    return {
      raw: data,
      html: markdown.toHTML(data),
      editing: false
    }
  },
  toggleEditor: function() {
    console.log(this.props);
    // let the editor know the text, and to become visible
    this.props.app.editEditable(this, this.state.raw);
    // this.setState({'editing': ! this.state.editing });
  },
  updateText: function(newText) {
    this.setState({
      raw: newText,
      md:markdown.toHTML(newText)
    });
  },
  render: function() {
    var editor, html;
    if (this.props.text) {
      html = this.props.text;
    } else {
      html = this.state.html;
    }
    var contents = React.DOM.span({
     dangerouslySetInnerHTML: {__html: html}
    });
    var self = this;
    return (
      <div>
        <div className="editable">
          <div onClick={this.toggleEditor} className="button edit-button">
            <i className="fa fa-2x fa-pencil-square-o"></i>
          </div>
          <div className="contents">
            {contents}
          </div>
        </div>
      </div>
    );
  }
});

module.exports.Editable = Editable;
module.exports.Editor = Editor;