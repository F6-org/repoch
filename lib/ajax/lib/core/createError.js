'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createError;

var _enhanceError = require('./enhanceError');

var _enhanceError2 = _interopRequireDefault(_enhanceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function createError(message, config, code, response) {
  var error = new Error(message);
  return (0, _enhanceError2.default)(error, config, code, response);
};
//# sourceMappingURL=createError.js.map