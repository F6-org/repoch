'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author zhenkun
 * @export 灰底折罩，容器型组件
 * @prop {关闭弹层函数} close
 * @prop {定制的背景遮罩} style
 * @prop {是否显示弹层} show
 */
var Mask = function (_Component) {
    _inherits(Mask, _Component);

    function Mask() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mask);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mask.__proto__ || Object.getPrototypeOf(Mask)).call.apply(_ref, [this].concat(args))), _this), _this.disableTouchMove = function (e) {
            var _this$props$disableTo = _this.props.disableTouchMove,
                disableTouchMove = _this$props$disableTo === undefined ? true : _this$props$disableTo;

            if (!disableTouchMove) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.nativeEvent.preventDefault();
            return false;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mask, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$close = _props.close,
                close = _props$close === undefined ? function () {} : _props$close,
                style = _props.style,
                _props$show = _props.show,
                show = _props$show === undefined ? false : _props$show;


            return _react2.default.createElement(
                'div',
                { className: 'mask-root' },
                _react2.default.createElement('div', { className: 'mask-layer ' + (show ? 'show' : ''), style: style, onClick: close, onTouchMove: this.disableTouchMove }),
                _react2.default.createElement(
                    'div',
                    { className: 'mask-content' },
                    this.props.children
                )
            );
        }
    }]);

    return Mask;
}(_react.Component);

exports.default = Mask;
//# sourceMappingURL=index.js.map