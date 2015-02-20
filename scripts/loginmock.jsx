var React = require('react');
var amLoggedIn = false;

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
      return <span>logged in <button onClick={this.signout}>sign out</button></span>
    } else {
      return <button onClick={this.signin}>sign in</button>
    }
  }
});

function isLoggedIn() {
  return amLoggedIn;
}

module.exports.LoginMock = LoginMock;
module.exports.isLoggedIn = isLoggedIn;
