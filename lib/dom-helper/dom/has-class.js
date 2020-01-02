'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (node, className) {
    if (!node || !className || (0, _isWindow2.default)(node)) return;
    var klass = node.className || '',
        svg = klass && klass.baseVal !== undefined;

    return node.classList ? node.classList.contains(className) : new RegExp('(^|\\s)' + className + '($|\\s)').test(svg ? klass.baseVal : klass);
};

var _isWindow = require('./is-window');

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=has-class.js.map