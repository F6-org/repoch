'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * 请求登陆微博账号
                                                                                                                                                                                                                                                                   * 仅 weibo.com、weibo.cn、sina.com、sina.com.cn 及其子域名可以调用
                                                                                                                                                                                                                                                                   * 如果在已登陆状态调用此方法，客户端会检查 Cookie 是否过期。
                                                                                                                                                                                                                                                                   * 如果过期：开始Cookie刷新；未过期：回调成功
                                                                                                                                                                                                                                                                   * @param {Object} opts
                                                                                                                                                                                                                                                                   * @param {Object} opts.title - 标题对象
                                                                                                                                                                                                                                                                     {
                                                                                                                                                                                                                                                                      zh_CN: 简体中文标题
                                                                                                                                                                                                                                                                      zh_HK: 繁体中文标题
                                                                                                                                                                                                                                                                      en_US: 英文标题
                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                   * @param {Function} opts.onSuccess 执行成功回调
                                                                                                                                                                                                                                                                   * @param {Function} opts.onFail 执行失败回调
                                                                                                                                                                                                                                                                   * @return {String} uid
                                                                                                                                                                                                                                                                   * @weibo >=5.1.0
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
        title: '',
        onSuccess: function onSuccess() {},
        onFail: function onFail() {}
    }, opts);

    var bridgeReady = function bridgeReady() {
        window.WeiboJSBridge.invoke("loginWeiboAccount", { title: opts.title }, function (params, success, code) {
            if (success) {
                opts.onSuccess(params.uid);
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
//# sourceMappingURL=login-weibo.js.map