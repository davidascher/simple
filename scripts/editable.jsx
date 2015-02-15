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
    //
  },
  onKeyUp: function(event) {
    console.log("got onkeyup");
    console.log(event.target.value);
    this.props.onchange(event.target.value);
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
    if (this.state.blurred) {
      classes = classes + "blurred";
    } else {
      classes = classes + "active";
    }
    return (
        <Draggable handle=".toolbar">
          <div className={classes} onBlur={this.onBlur} onFocus={this.onFocus}>
            <div style={editorStyle} className="editor">
              <div className="editor-background"/>
              <div className="toolbar" onMouseDown={this.onMouseDown}>
                <EditorButton icon="header"/>
                <EditorButton icon="bold"/>
                <EditorButton icon="italic"/>
              </div>
              <textarea defaultValue={this.props.text} 
                        onChange={this.onChange} 
                        onMouseUp={this.onMouseUp}
                        onMouseMove={this.onMouseMove}
                        onKeyUp={this.onKeyUp} 
                        className="inputfield"></textarea>
            </div>
          </div>
        </Draggable>
    );
  }
});

var Editable = React.createClass({
  getInitialState: function() {
    var data = require("../content/"+this.props.fileName);
    return {
      raw: data,
      md:markdown.toHTML(data),
      editing: false
    }
  },
  toggleEditor: function() {
    this.setState({'editing': ! this.state.editing });
  },
  updateText: function(newText) {
    this.setState({
      raw: newText,
      md:markdown.toHTML(newText)
    });
  },
  render: function() {
    var editor;
    var contents = React.DOM.span({
     dangerouslySetInnerHTML: {__html: this.state.md}
    });
    var self = this;
    return (
      <div>
        <Editor visible={this.state.editing} 
                text={this.state.raw}
                onchange={self.updateText}
                />
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

module.exports = Editable;