'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerCallback = exports.isCommonError = exports.post = exports.get = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _axios = require('./lib/axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsonToQuery = require('../format/json-to-query');

var _jsonToQuery2 = _interopRequireDefault(_jsonToQuery);

var _jumpPage = require('../jump-page');

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _logger = require('../logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajLocks = {};
var callbacks = {};
var processResponse = function processResponse(result) {
    switch (result.status) {
        case 200:
            var res = result.data;
            switch (res.code) {
                case 100000:
                case '100000':
                    return { data: res.data, msg: res.msg };

                case 100002:
                case '100002':
                    if (callbacks[res.code]) {
                        callbacks[res.code](res);
                    } else {
                        (0, _jumpPage.jumpPage)(res.data.url || "http://passport.weibo.cn/signin/login?r=" + encodeURIComponent(window.location.href), { replace: true });
                    }

                    break;

                case 100004:
                case '100004':
                    if (callbacks[res.code]) {
                        callbacks[res.code](res);
                    } else {
                        (0, _jumpPage.jumpPage)(res.data.url || '/errpage?r=' + encodeURIComponent(window.location.href), { replace: true });
                    }

                    break;
                default:
                    break;
            }

            return Promise.reject(res);

        default:
            return Promise.reject('服务器错误');
    }
};

var get = exports.get = function get(url, data, options) {
    var reqUrl = url;
    if (data) {
        if (data[0] === '?' || data[0] === '&') {
            (0, _warning2.default)(false, '[utils/io/ajax] ' + 'do not put "?" or "$" as the first byte of data, "' + data + '"');
        }
        reqUrl += reqUrl.indexOf('?') < 0 ? '?' : '&';
        reqUrl += typeof data === 'string' ? data : (0, _jsonToQuery2.default)(data);
    }

    reqUrl += reqUrl.indexOf('?') < 0 ? '?' : '&';
    reqUrl += '_lid=' + (0, _logger.gettid)();

    if (options) {
        delete options.cache;
    }

    if (ajLocks[reqUrl]) return;
    ajLocks[reqUrl] = true;

    return _axios2.default.get(reqUrl, options).then(function (result) {
        delete ajLocks[reqUrl];
        return result;
    }).catch(function (result) {
        delete ajLocks[reqUrl];
        return Promise.reject('服务器错误');
    }).then(processResponse);
};

var post = exports.post = function post(url, data, options) {
    if (ajLocks[url]) return;
    ajLocks[url] = true;

    if (options && options.raw) {
        data['_lid'] = (0, _logger.gettid)();
        delete options.raw;
    } else if (typeof data === 'string') {
        data += data === '' ? '' : '&';
        data += '_lid=' + (0, _logger.gettid)();
    } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        data = data || {};
        data['_lid'] = (0, _logger.gettid)();
        data = (0, _jsonToQuery2.default)(data);
    }

    return _axios2.default.post(url, data, options).then(function (result) {
        delete ajLocks[url];
        return result;
    }).catch(function (result) {
        delete ajLocks[url];
        return Promise.reject('服务器错误');
    }).then(processResponse);
};

var isCommonError = exports.isCommonError = function isCommonError(res) {
    if (process.env.NODE_ENV === 'development') {
        console.error(res);
    }
    return res && (res.code == 100002 || res.code == 100004);
};

var registerCallback = exports.registerCallback = function registerCallback(code, callback) {
    callbacks[code] = callback;
};
//# sourceMappingURL=index.js.map