'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (dom) {
    var ret = {};
    if (!dom.parentNode) {
        _hideContainer2.default.appendChild(dom);
        ret = getSize(dom);
        _hideContainer2.default.removeChild(dom);
    } else {
        ret = getSize(dom);
    }
    return ret;
};

var _hideContainer = require('../util/hide-container');

var _hideContainer2 = _interopRequireDefault(_hideContainer);

var _isNode = require('./is-node');

var _isNode2 = _interopRequireDefault(_isNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取dom的宽高
 * @id STK.core.dom.getSize
 * @params {Element} dom 被计算的dom节点
 * @return {Object} 
 *         {
 *             'width' : 0
 *             'height' : 0
 *         }
 * @author Robin Young | yonglin@staff.sina.com.cn
 * @example 
 * STK.core.dom.getSize(STK.E('layer'));
 */
var size = function size(dom) {
    if (!(0, _isNode2.default)(dom)) {
        throw 'core.dom.getSize need Element as first parameter';
    }
    return {
        'width': dom.offsetWidth,
        'height': dom.offsetHeight
    };
};
/*
    为隐藏元素
*/
var getSize = function getSize(dom) {
    var ret = null;
    if (dom.style.display === 'none') {
        dom.style.visibility = 'hidden';
        dom.style.display = '';
        ret = size(dom);
        dom.style.display = 'none';
        dom.style.visibility = 'visible';
    } else {
        ret = size(dom);
    }
    return ret;
};

;
//# sourceMappingURL=get-size.js.map