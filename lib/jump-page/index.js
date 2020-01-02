'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jumpPage = jumpPage;

var _browserHistory = require('../react-router/lib/browserHistory');

var _browserHistory2 = _interopRequireDefault(_browserHistory);

var _isSameOrigin = require('../is-same-origin');

var _isSameOrigin2 = _interopRequireDefault(_isSameOrigin);

var _isWeibo = require('../ua-detector/is-weibo');

var _isWeibo2 = _interopRequireDefault(_isWeibo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jumpPage(url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!process.env.BROWSER) return;

    var force = opts.force,
        replace = opts.replace,
        blank = opts.blank;
    //强制window.location.href跳转

    if (force) {
        if (replace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }

        return;
    }

    if (blank) {
        if ((0, _isWeibo2.default)()) {
            window.open('sinaweibo://browser?url=' + encodeURIComponent(url));
        } else {
            window.open(url);
        }

        return;
    }

    var method = replace ? 'replace' : 'push';
    var parsedUrl = (0, _isSameOrigin2.default)(url);
    if (parsedUrl === false) {
        var realUrl = decodeURIComponent(url.split('sinaweibo://browser?url=')[1]);
        if (realUrl !== 'undefined') {
            // 临时的兼容代码
            if (realUrl.indexOf('cf.weibo.com') > -1) {
                realUrl = realUrl.split('cf.weibo.com')[1];
            }
            var parsedRealUrl = (0, _isSameOrigin2.default)(realUrl);
            if (parsedRealUrl !== false) {
                _browserHistory2.default[method](realUrl);
                return;
            }
        }
        url += url.indexOf('sinainternalbrowser') < 0 ? (url.indexOf('?') < 0 ? '?' : '&') + 'sinainternalbrowser=topnav' : '';

        if (replace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    } else {
        var pathname = parsedUrl.pathname,
            search = parsedUrl.search;

        _browserHistory2.default[method](pathname + (search ? '?' + search : ''));
    }
} /**
   * 页面跳转功能函数
   * @name jumpPage
   * @function
   * @param {String} node
   * @param {Object} 
   *         {
   *             'force' : 强制使用window.location.href跳转
   *             'blank' : 新开页打开连接
   *             'replace':替换当前的url历史记录
   *         }
   * @author MrGalaxyn
   */
//# sourceMappingURL=index.js.map