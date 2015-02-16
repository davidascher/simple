var React = require('react');
var markdown = require('markdown').markdown;

require("./editable.less");

var Editable = React.createClass({
  getInitialState: function() {
    var data = require("../content/"+this.props.fileName);
    return {
      raw: data,
      html:markdown.toHTML(data),
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
      raw: newText.raw,
      md:markdown.toHTML(newText.raw)
    });
  },
  render: function() {
    var editor, html;
    if (this.props.raw) {
      html = markdown.toHTML(this.props.raw);
    } else {
      html = this.state.html;
    }
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
