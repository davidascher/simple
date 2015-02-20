var React = require('react');
var markdown = require('markdown-js').markdown;
var {loadDoc} = require("./editor.jsx");
var {isLoggedIn} = require("./loginmock.jsx");
var Firebase = require("client-firebase");
var ref = new Firebase("https://folk-words.firebaseio.com/");

require("./editable.less");
function encodeForFB(thing) {
  return encodeURIComponent(thing).replace('.', '-');
}

var EditBlock = React.createClass({
  getInitialState: function() {
    return {loggedIn: isLoggedIn()}
  },
  toggleEditor: function() {
    loadDoc(this.props.editable, this.props.editable.state.raw);
  },
  componentDidMount: function() {
    var self = this;
    this._listener = window.addEventListener('login', function (e) { 
      self.setState(e.detail)
     }, false);
  },
  componentWillUnmount: function() {
    window.removeEventListener('login', this._listener);
  },
  render: function() {
    var classes;
    if (this.state.loggedIn) {
      classes = "button edit-button visible";
    } else {
      classes = "button edit-button hidden";
    }
    return <div onClick={this.toggleEditor} className={classes}>
              <i className="fa fa-2x fa-pencil-square-o"></i>
            </div>;
  }
})



var Editable = React.createClass({
  getInitialState: function() {
    var data = require("../content/"+this.props.path);
    return {
      raw: data,
      html:markdown(data),
      editing: false
    }
  },
  componentDidMount: function() {
    var self = this;
    ref.child(encodeForFB(this.props.path)).on("value",
      function(snapshot) {
        var words = snapshot.val();
        if (words) {
          self.setState({raw: words,
            html:markdown(words)
          });
        } else {
          console.log("we have no words for ", self.props.path);
          ref.child(encodeForFB(self.props.path)).set(self.state.raw);
        }
      });
  },
  updateText: function(newText) {
    this.setState({
      raw: newText,
      html:markdown(newText)
    });
  },
  persistText: function(newText) {
    ref.child(encodeForFB(this.props.path)).set(newText);
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
          <EditBlock editable={this}/>
          <div className="contents">
            {contents}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Editable;
