// Store

var Marty = require('marty');

var Constants = Marty.createConstants([
  'SET_CURRENT_DOC',
  'CHANGE_DOC_CONTENT'
]);


var DocStore = Marty.createStore({
  displayName: 'Docs',
  handlers: {
    setCurrentDoc: Constants.SET_CURRENT_DOC,
    changeDocContnet: Constants.CHANGE_DOC_CONTENT
  },

  getInitialState: function () {
    return {
      {
        currentDoc: null,
        currentDocContent: "" // stored in markdown
      }
    };
  },

  setCurrentDoc: function (doc) {
    this.state[currentDoc] = doc;
    this.hasChanged();
  },

  getCurrentDoc: function() {
    return this.state.currentDoc;
  },

  getCurrentDocContent: function() {
    return this.state.currentDocContent;
  },

  changeDocContent: function (markdown) {
    this.state[currentDocContent] = markdown;
    this.hasChanged();
  }
});

var listener = DocStore.addChangeListener(function () {
  console.log('Doc store changed');
  listener.dispose();
});

module.exports = DocStore;
