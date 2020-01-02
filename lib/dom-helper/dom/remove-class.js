"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (node, className) {
    if (!node || !className || (0, _isWindow2.default)(node)) return;

    className.split(/\s+/g).forEach(function (klass) {
        if (!(0, _hasClass2.default)(node, klass)) return;

        if (node.classList) node.classList.remove(klass);else {
            if (node.className && node.className.baseVal !== undefined) node.className.baseVal = node.className.baseVal.replace(new RegExp('(?:^|\\s)' + klass + '(?:\\s|$)'), ' ');else node.className = node.className.replace(new RegExp('(?:^|\\s)' + klass + '(?:\\s|$)'), ' ');
        }
    });
};

var _isWindow = require("./is-window");

var _isWindow2 = _interopRequireDefault(_isWindow);

var _hasClass = require("./has-class");

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /**
   * remove a classname(s) for an Element
   * @name dom#removeClassName
   * @function
   * @param {Element} node
   * @param {String} className
   * @author MrGalaxyn
   */
//# sourceMappingURL=remove-class.js.map