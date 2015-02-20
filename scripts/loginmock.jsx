var React = require('react');
var amLoggedIn = false;
require("./loginmock.less");

var LoginMock = React.createClass({
  getInitialState: function() {
    return {loggedIn: false}
  },
  signin: function() {
    amLoggedIn = true;
    this.setState({loggedIn: amLoggedIn});
    var event = new CustomEvent('login', { detail: {'loggedIn': true }});
    window.dispatchEvent(event);
  },
  signout: function() {
    amLoggedIn = false;
    this.setState({loggedIn: amLoggedIn});
    var event = new CustomEvent('login', { detail: {'loggedIn': false }});
    window.dispatchEvent(event);
  },
  render: function() {
    if (this.state.loggedIn) {
      return <div className="loginbar"><button className="btn" onClick={this.signout}>sign out</button></div>
    } else {
      return <div className="loginbar"><button className="btn btn-success" onClick={this.signin}>sign in</button></div>
    }
  }
});

function isLoggedIn() {
  return amLoggedIn;
}

module.exports.LoginMock = LoginMock;
module.exports.isLoggedIn = isLoggedIn;
