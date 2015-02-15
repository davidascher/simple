var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');
var markdown = require('markdown').markdown;

var ReactMarkdownFile = React.createClass({
  displayName: 'ReactMarkdownFile',
  propTypes: {
    fileName: PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      md: ''
    }
  },
  componentDidMount: function() {
    if (this.props.fileName) {
      var data = require("html!../content/"+this.props.fileName);
      this.setState({md:data});
    }
  },
  render: function() {
    return React.DOM.span({
     dangerouslySetInnerHTML: {__html: this.state.md}
    });
  }
});

module.exports = ReactMarkdownFile;