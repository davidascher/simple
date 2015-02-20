var React = require('react');
var markdown = require('markdown').markdown;

require("./editor.less");

var EditorButton = React.createClass({
  render: function() {
    var classnames = "editor-button fa fa-" + this.props.icon;
    return (
      <i className={classnames} onClick={this.props.onClick}/>
    );
  }
});

var singletonEditor = null;

var loadDoc = function(editable, text) {
  if (singletonEditor) {
    singletonEditor.loadDoc(editable, text)
  } else {
    console.log("we have no editor setup");
  }
};

var Editor = React.createClass({
  getInitialState:function() {
    return {blurred:false};
  },
  componentDidMount: function() {
    if (singletonEditor) { 
      console.log("Uh-oh -- shouldn't have more than one editor");
      return;
    }
    singletonEditor = this;
  },
  loadDoc: function(editable, text) {
    this.setState({editable: editable, initialText: text, text:text, visible:true, blurred:false})
    // this.refs.textInput.getDOMNode().focus();  // doesn't seem to work, not surprisingly
  },
  onChange: function(event) {
    this.setState({text: event.target.value});
    this.state.editable.updateText(event.target.value);
  },
  onKeyPress: function(event) {
    this.state.editable.updateText(event.target.value);
  },
  onKeyUp: function(event) {
    if (event.keyCode === 27) {
      this.close(); // is that what people want?
    }
  },
  onMouseDown: function(event) {

  },
  onMouseMove: function(event) {
  },
  onBlur: function(event) {
    this.setState({blurred:true})
  },
  onFocus: function(event) {
    this.setState({blurred:false})
  },
  save: function(event) {
    this.state.editable.persistText(this.state.text);
    this.setState({visible:false});
  },
  close: function(event) {
    this.state.editable.updateText(this.state.initialText);
    this.setState({visible:false});
  },
  render: function() {
    var editorStyle = {
      display: this.state.visible == true ? "block" : "none",
    }
    var classes = "editor-container "; 
    if (this.state.visible) {
      classes = classes + "active";
      if (this.state.blurred) {
        classes = classes + " blurred";
      }
    } else {
      classes = classes + "collapsed";
    }
    var text = this.state.text;
    return (
      <div className={classes}>

        <div XXstyle={editorStyle} className="editor">
          <div className="editor-background"/>
          <div className="toolbar" onMouseDown={this.onMouseDown}>
            <EditorButton icon="header"/>
            <EditorButton icon="bold"/>
            <EditorButton icon="italic"/>
            <EditorButton onClick={this.save} icon="save"/>
            <EditorButton onClick={this.close} icon="close"/>
          </div>
          <textarea value={text} 
                    ref="textInput"
                    onChange={this.onChange} 
                    onKeyPress={this.onKeyPress} 
                    onKeyUp={this.onKeyUp} 
                    className="inputfield"></textarea>
        </div>
      </div>
    );
  }
});



module.exports.Editor = Editor;
module.exports.loadDoc = loadDoc;
