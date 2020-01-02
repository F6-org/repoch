'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _bind = require('./helpers/bind');

var _bind2 = _interopRequireDefault(_bind);

var _Axios = require('./core/Axios');

var _Axios2 = _interopRequireDefault(_Axios);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _Cancel = require('./cancel/Cancel');

var _Cancel2 = _interopRequireDefault(_Cancel);

var _CancelToken = require('./cancel/CancelToken');

var _CancelToken2 = _interopRequireDefault(_CancelToken);

var _isCancel = require('./cancel/isCancel');

var _isCancel2 = _interopRequireDefault(_isCancel);

var _spread = require('./helpers/spread');

var _spread2 = _interopRequireDefault(_spread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new _Axios2.default(defaultConfig);
  var instance = (0, _bind2.default)(_Axios2.default.prototype.request, context);

  // Copy axios.prototype to instance
  _utils2.default.extend(instance, _Axios2.default.prototype, context);

  // Copy context to instance
  _utils2.default.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(_defaults2.default);

// Expose Axios class to allow class inheritance
axios.Axios = _Axios2.default;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(_utils2.default.merge(_defaults2.default, instanceConfig));
};

// Expose Cancel & CancelToken

axios.Cancel = _Cancel2.default;

axios.CancelToken = _CancelToken2.default;

axios.isCancel = _isCancel2.default;
// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _spread2.default;
exports.default = axios;
//# sourceMappingURL=axios.js.map