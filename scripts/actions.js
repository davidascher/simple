
var Marty = require('marty');

var DocActionCreators = Marty.createActionCreators({
  setCurrentDoc: DocActions.SET_CURRENT_DOC(function (doc) {
    this.dispatch(doc);
  }),
  setCurrentDocContent: DocActions.CHANGE_DOC_CONTENT(function (content) {
    this.dispatch(content);
  })
});

module.exports = DocActionCreators;
