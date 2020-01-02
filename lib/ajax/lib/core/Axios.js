'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaults = require('./../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _utils = require('./../utils');

var _utils2 = _interopRequireDefault(_utils);

var _InterceptorManager = require('./InterceptorManager');

var _InterceptorManager2 = _interopRequireDefault(_InterceptorManager);

var _dispatchRequest = require('./dispatchRequest');

var _dispatchRequest2 = _interopRequireDefault(_dispatchRequest);

var _isAbsoluteURL = require('./../helpers/isAbsoluteURL');

var _isAbsoluteURL2 = _interopRequireDefault(_isAbsoluteURL);

var _combineURLs = require('./../helpers/combineURLs');

var _combineURLs2 = _interopRequireDefault(_combineURLs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new _InterceptorManager2.default(),
    response: new _InterceptorManager2.default()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = _utils2.default.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = _utils2.default.merge(_defaults2.default, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !(0, _isAbsoluteURL2.default)(config.url)) {
    config.url = (0, _combineURLs2.default)(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [_dispatchRequest2.default, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
_utils2.default.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(_utils2.default.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

_utils2.default.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(_utils2.default.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

exports.default = Axios;
//# sourceMappingURL=Axios.js.map