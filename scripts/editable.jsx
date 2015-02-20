var React = require('react');
var markdown = require('markdown').markdown;
var {loadDoc} = require("./editor.jsx");

require("./editable.less");

var Editable = React.createClass({
  getInitialState: function() {
    var data = require("../content/"+this.props.path);
    return {
      raw: data,
      html:markdown.toHTML(data),
      editing: false
    }
  },
  toggleEditor: function() {
    loadDoc(this, this.state.raw);
  },
  updateText: function(newText) {
    this.setState({
      raw: newText,
      html:markdown.toHTML(newText)
    });
  },
  persistText: function(newText) { 
    // Save on "disk".
  },
  render: function() {
    var editor, html;
    html = this.state.html;
    var contents = React.DOM.span({
     dangerouslySetInnerHTML: {__html: html}
    });
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

module.exports = Editable;
