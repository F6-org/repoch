'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;

var _createError = require('./createError');

var _createError2 = _interopRequireDefault(_createError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject((0, _createError2.default)('Request failed with status code ' + response.status, response.config, null, response));
  }
};
//# sourceMappingURL=settle.js.map