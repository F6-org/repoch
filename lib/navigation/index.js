"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * scheme url operation
                                                                                                                                                                                                                                                                   * author: Fuyu@lonefy
                                                                                                                                                                                                                                                                   * create time: 2018-05-24
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */


exports.scheme = scheme;
exports.schemekk = schemekk;
exports.schemeclose = schemeclose;
exports.weiboShare = weiboShare;
exports.navigationCloseAndOpen = navigationCloseAndOpen;
exports.historyBackAddUrl = historyBackAddUrl;
exports.historyBackAddUrlWhen = historyBackAddUrlWhen;
exports.generateUrl = generateUrl;
exports.openUserProfile = openUserProfile;
exports.openClient = openClient;

var _weiboImage = require("../weibo-image");

var _weiboImage2 = _interopRequireDefault(_weiboImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scheme(url) {
    return "sinaweibo://browser?url=" + encodeURIComponent(url);
}

function schemekk(url) {
    return "sinaweibo://kk?url=" + encodeURIComponent(url);
}

function schemeclose(url) {
    return "sinaweibo://browser/close?scheme=" + encodeURIComponent(url);
}

function weiboShare(content) {
    var pics = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var picList = [].concat(pics).map(function (fid) {
        return {
            thumbnail: "https:" + (0, _weiboImage2.default)(fid, "thumbnail"),
            original: "https:" + (0, _weiboImage2.default)(fid, "large"),
            pid: fid
        };
    });
    window.location.href = "sinaweibo://sendweibo?content=" + encodeURIComponent(decodeURIComponent(content)) + (picList.length ? "&pics=" + encodeURIComponent(JSON.stringify(picList)) : "");
}

function navigationCloseAndOpen(url) {
    window.location.href = "sinaweibo://browser/close?scheme=" + encodeURIComponent(url);
}

function historyBackAddUrl(addUrl) {
    var curUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
    var _window = window,
        history = _window.history;

    if (history.pushState && history.length <= 1) {
        history.replaceState("curstate", null, curUrl);
        history.pushState({}, null, curUrl);
    }
    window.onpopstate = function (e) {
        if (e.state == "curstate") {
            window.location.replace(addUrl);
        }
    };
}

function historyBackAddUrlWhen(addUrl) {
    var judgement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.history.length <= 1;
    var _window2 = window,
        history = _window2.history,
        location = _window2.location;

    var curUrl = location.href;
    if (history.pushState && judgement) {
        history.replaceState("newstate", null, curUrl);
        history.pushState({}, null, curUrl);
    }
    window.onpopstate = function (e) {
        if (e.state == "newstate") {
            location.replace(addUrl);
        }
    };
}

/*
 * 生成目标页地址
 * 用于保留当前页面url query
 * 
 * @params url[string] 目标页url
 * @params addition[object] 增加字段
 * @params reserve[string/array] 保留query
 * 
 * @return url[string]
 */
function generateUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var addition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var reserve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var searchString = window.location.search,
        query = {},
        target = url.split("?"),
        reserve = [].concat(reserve);

    addQuery(searchString.substr(1, searchString.length));

    target[1] && addQuery(target[1], false);

    addition = _extends(addition, query);

    return target[0] + "?" + Object.keys(addition).map(function (k) {
        return k + "=" + addition[k];
    }).join("&");

    function addQuery(string) {
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        string.split("&").map(function (item) {
            var _item$split = item.split("="),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            if (filter) {
                if (reserve.indexOf(key) !== -1) {
                    query[key] = value;
                }
            } else {
                query[key] = value;
            }
        });
    }
}
/*
 * 打开用户profile页 
 * @params uid
 * 
 */
function openUserProfile(uid) {
    if (!uid) {
        console.warn('no Params: uid');
        return;
    }
    var url = "http://weibo.com/" + uid + "/profile";

    if (/__weibo__/.test(window.navigator.userAgent)) {
        url = "sinaweibo://userinfo?uid=" + uid;
    }
    window.location.href = url;
}

/*
 * 端外呼起客户端 
 * @params url
 * 
 */
function openClient(url) {
    window.location.href = ['https://m.weibo.cn/feature/openapp?scheme=', encodeURIComponent(['sinaweibo://browser?url=', encodeURIComponent(url)].join('')), '&yingyongbao=1&url=', encodeURIComponent(url)].join('');
}
//# sourceMappingURL=index.js.map