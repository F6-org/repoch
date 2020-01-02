'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components


var Mask = function (_React$Component) {
    _inherits(Mask, _React$Component);

    function Mask(props) {
        _classCallCheck(this, Mask);

        return _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).call(this, props));
        // this.state = {}
    }

    _createClass(Mask, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.mask.removeEventListener('touchmove', this.handleMove);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.mask.addEventListener('touchmove', this.handleMove);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            document.body.style.overflow = this.props.show ? 'hidden' : "";
        }
    }, {
        key: 'onClose',
        value: function onClose(e) {
            e.preventDefault();
            e.stopPropagation();

            this.props.onClose && this.props.onClose(e);
            var _props$onClick = this.props.onClick,
                onClick = _props$onClick === undefined ? function () {} : _props$onClick;

            onClick();
            return false;
        }
    }, {
        key: 'handleMove',
        value: function handleMove(e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.nativeEvent.preventDefault();
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var disableBackClose = this.props.disableBackClose;


            return _react2.default.createElement('div', { ref: 'mask', className: "mask " + (this.props.show ? "in" : "out"),
                onTouchMove: function onTouchMove(e) {
                    return _this2.handleTouchMove(e);
                },
                onClick: function onClick(e) {
                    return !disableBackClose && _this2.onClose(e);
                }
            });
        }
    }]);

    return Mask;
}(_react2.default.Component);

exports.default = Mask;
//# sourceMappingURL=index.js.map