'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alert = require('./alert.css');

var _alert2 = _interopRequireDefault(_alert);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var Alert = function (_React$Component) {
    _inherits(Alert, _React$Component);

    function Alert() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Alert);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Alert.__proto__ || Object.getPrototypeOf(Alert)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            show: _this.props.show
        }, _this.componentWillReceiveProps = function (nextProps) {
            _this.setState({ show: nextProps.show });
        }, _this.entered = function () {
            _this.props.onShow();
        }, _this.exited = function () {
            _this.props.onHide();
        }, _this.handleMaskClick = function () {
            if (!_this.props.hideWhenMaskClick) return;
            _this.setState({ show: false });
        }, _this.handleClick = function () {
            _this.props.onOk();
            _this.setState({ show: false });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Alert, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _modal2.default,
                {
                    show: this.state.show,
                    transition: false,
                    onShow: this.entered,
                    onHide: this.exited,
                    withMask: true,
                    isMiddle: true,
                    onMaskClick: this.handleMaskClick
                },
                _react2.default.createElement(
                    'div',
                    { className: 'E_layer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'layer_common', style: { textAlign: this.props.contentAlign } },
                            this.props.content
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'E_layer_btn' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { onClick: this.handleClick, className: 'E_btn_grey btn_ok' },
                                    this.props.okText
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Alert;
}(_react2.default.Component);

Alert.propTypes = {
    content: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.string.isRequired]), // 提示文案
    onShow: _propTypes2.default.func, // 组件展示后回调函数
    onHide: _propTypes2.default.func, // 组件隐藏后回调函数
    onOk: _propTypes2.default.func, // 点击按钮后回调
    okText: _propTypes2.default.string, // 按钮文案
    contentAlign: _propTypes2.default.string, // 文案对齐方式 
    hideWhenMaskClick: _propTypes2.default.bool // 点击背景是否隐藏
};
Alert.defaultProps = {
    okText: '确定',
    onHide: noop,
    onShow: noop,
    onOk: noop,
    contentAlign: 'center',
    hideWhenMaskClick: false
};
exports.default = Alert;
//# sourceMappingURL=index.js.map