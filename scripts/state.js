var Marty = require("marty");
var DocStore = require("./docstore.js");

var DocState = Marty.createStateMixin({
  listenTo: DocStore,
  getState: function () {
    return {
      currentDoc: DocStore.getCurrentDoc(),
      currentDocContent: DocStore.getCurrentDocContent()
    };
  }
});

var Users = React.createClass({
  mixins: [UserState],
  render: function () {
    return (<ul>
      {this.state.map(function (user) {
        return <li>{user.name}</li>;
      })}
    </ul>);
  }

module.exports = DocState;