'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * 查看大图
                                                                                                                                                                                                                                                                   * @param {Object} opts
                                                                                                                                                                                                                                                                   * @param {String|Array} opts.urls 需要查看的图片地址,数组第一个元素第一个展示
                                                                                                                                                                                                                                                                   * @param {Function} opts.onSuccess 执行成功回调
                                                                                                                                                                                                                                                                   * @param {Function} opts.onFail 执行失败回调
                                                                                                                                                                                                                                                                   * @weibo >=4.3.0
                                                                                                                                                                                                                                                                   * @Auther MrGalaxyn
                                                                                                                                                                                                                                                                   * 错误码
                                                                                                                                                                                                                                                                      代码        Status Code           含义
                                                                                                                                                                                                                                                                      200         OK                  操作成功
                                                                                                                                                                                                                                                                      400         MISSING_PARAMS      缺少必须的参数
                                                                                                                                                                                                                                                                      403         ILLEGAL_ACCESS      非法调用
                                                                                                                                                                                                                                                                      500         INTERNAL_ERROR      客户端内部处理错误
                                                                                                                                                                                                                                                                      501         ACTION_NOT_FOUND    客户端未实现此 action
                                                                                                                                                                                                                                                                      550         NO_RESULT           客户端没有获取到结果
                                                                                                                                                                                                                                                                      550         USER_CANCELLED      用户取消了操作
                                                                                                                                                                                                                                                                      553         SERVICE_FORBIDDEN   相关服务未启用或被禁止 (如定位服务，相册权限)
                                                                                                                                                                                                                                                                   */


exports.default = function (opts) {
    opts = _extends({
        urls: '',
        onSuccess: function onSuccess() {},
        onFail: function onFail() {}
    }, opts);

    var bridgeReady = function bridgeReady() {
        if (typeof pts.urls === 'string') opts.urls = [opts.urls];

        window.WeiboJSBridge.invoke("openImage", { url: opts.urls[0], urls: opts.urls }, function (params, success, code) {
            if (success) {
                opts.onSuccess(params);
            } else {
                opts.onFail(code);
            }
        });
    };

    if (!window.WeiboJSBridge) {
        opts.onFail(550);
        (0, _on2.default)(document, 'WeiboJSBridgeReady', bridgeReady);
        return;
    }

    bridgeReady();
};

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=open-image.js.map