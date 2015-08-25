/**
 * @fileoverview ESLint HTML 'Lite' reporter
 */

var LintReporter = require('./src/js/lint-reporter');
var templateUtils = require('hairballs-ext').templateUtils;


module.exports = function(results) {
  var lintReporter = new LintReporter();
  var data = lintReporter.runReport(results, false, false);

  return templateUtils.applyTemplates(data);
};
