var React = require('react');
var markdown = require('markdown').markdown;

require("./editor.less");

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
    this.props.textChanged(event.target.value)
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

module.exports = Editor;
