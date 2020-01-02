"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isNode = require("../dom/is-node");

var _isNode2 = _interopRequireDefault(_isNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hideDiv; /**
              * 页面统一隐藏容器工具
              * @id STK.core.util.hideContainer
              * @author Finrila | wangzheng4@staff.sina.com.cn
              * @example 
              * STK.core.util.hideContainer.appendChild(STK.E('test'));
              * STK.core.util.hideContainer.removeChild(STK.E('test'));
              * @import STK.core.dom.isNode
              */


var initDiv = function initDiv() {
    if (hideDiv) return;
    hideDiv = $.C("div");
    hideDiv.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
    document.getElementsByTagName("head")[0].appendChild(hideDiv);
};

exports.default = {
    /**
     * 向隐藏容器添加节点
     * @method appendChild
     * @param {Element} el 节点
     */
    appendChild: function appendChild(el) {
        if ((0, _isNode2.default)(el)) {
            initDiv();
            hideDiv.appendChild(el);
        }
    },
    /**
     * 向隐藏容器添加节点
     * @method removeChild
     * @param {Element} el 节点
     */
    removeChild: function removeChild(el) {
        if ((0, _isNode2.default)(el)) {
            hideDiv && hideDiv.removeChild(el);
        }
    }
};
//# sourceMappingURL=hide-container.js.map