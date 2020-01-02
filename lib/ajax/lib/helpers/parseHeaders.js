'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHeaders;

var _utils = require('./../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  _utils2.default.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = _utils2.default.trim(line.substr(0, i)).toLowerCase();
    val = _utils2.default.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};
//# sourceMappingURL=parseHeaders.js.map