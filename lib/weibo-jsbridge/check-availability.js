'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * 检查 API 是否可用
                                                                                                                                                                                                                                                                   * @param {Object} opts
                                                                                                                                                                                                                                                                   * @param {Array} opts.api api数组 
                                                                                                                                                                                                                                                                   * @param {Function} opts.onSuccess 执行成功回调
                                                                                                                                                                                                                                                                   * @param {Function} opts.onFail 执行失败回调
                                                                                                                                                                                                                                                                   * @return {Object} 包含 api 可用性的键值对
                                                                                                                                                                                                                                                                   * @weibo >=5.1.0
                                                                                                                                                                                                                                                                   * @example 
                                                                                                                                                                                                                                                                      STK.utils.weiboJSBridge.checkAvailablity({
                                                                                                                                                                                                                                                                          api:['setMenuItems', 'networkTypeChanged', 'notexist']
                                                                                                                                                                                                                                                                      })
                                                                                                                                                                                                                                                                      return {'setMenuItems': false, 'networkTypeChanged': true, 'notexist': false}
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
        api: [],
        onSuccess: function onSuccess() {},
        onFail: function onFail() {}
    }, opts);

    var bridgeReady = function bridgeReady() {
        window.WeiboJSBridge.invoke("checkAvailability", { api_list: opts.api }, function (params, success, code) {
            if (success) {
                opts.onSuccess(params.result);
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
//# sourceMappingURL=check-availability.js.map