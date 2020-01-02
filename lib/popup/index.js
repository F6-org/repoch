'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var Popup = function (_React$Component) {
    _inherits(Popup, _React$Component);

    function Popup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Popup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popup.__proto__ || Object.getPrototypeOf(Popup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            show: _this.props.show
        }, _this.entered = function () {
            _this.props.onShow();
        }, _this.exited = function () {
            _this.props.onHide && _this.props.onHide();
        }, _this.componentWillReceiveProps = function (nextProps) {
            _this.setState({ show: nextProps.show });
        }, _this.handleEscapeKeyUp = function () {
            _this.setState({ show: false });
        }, _this.handleMaskClick = function () {
            if (!_this.props.hideWhenMaskClick) return;
            _this.setState({ show: false });
        }, _this.handleClick = function (val, text) {
            if (!_this.state.show) return;
            _this.setState({ show: false });
            _this.props.onChoose && _this.props.onChoose(val, text);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Popup, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var layerTransitionClassOpts = {
                enteredClassName: _styles2.default['layer_bottom_show'],
                enteringClassName: _styles2.default['layer_bottom_show'],
                exitedClassName: _styles2.default['layer_bottom_hide'],
                exitingClassName: _styles2.default['layer_bottom_hide']
            };

            var maskTransitionClassOpts = {
                enteredClassName: _styles2.default['mask_bottom_show'],
                enteringClassName: _styles2.default['mask_bottom_show'],
                exitedClassName: _styles2.default['mask_bottom_hide'],
                exitingClassName: _styles2.default['mask_bottom_hide']
            };

            var allData = this.props.data.map(function (item, i) {
                return _react2.default.createElement(
                    'li',
                    { className: 'pop_bar publish',
                        key: i,
                        onClick: _this2.handleClick.bind(_this2, item.val, item.text) },
                    _react2.default.createElement(
                        'p',
                        null,
                        item.text
                    ),
                    item.desc_text ? _react2.default.createElement(
                        'p',
                        { className: 'pop_desc_text' },
                        item.desc_text
                    ) : null
                );
            });

            return _react2.default.createElement(
                _modal2.default,
                {
                    show: this.state.show,
                    transition: true,
                    onShow: this.entered,
                    onHide: this.exited,
                    withMask: true,
                    onEscapeKeyUp: this.handleEscapeKeyUp,
                    transitionClassOpts: layerTransitionClassOpts,
                    maskTransitionClassOpts: maskTransitionClassOpts,
                    onMaskClick: this.handleMaskClick
                },
                _react2.default.createElement(
                    'div',
                    { className: 'mask', style: { display: 'block', zIndex: 10002 } },
                    _react2.default.createElement(
                        'ul',
                        { className: 'pop' },
                        _react2.default.createElement(
                            'li',
                            { className: 'pop_bar' },
                            ' ',
                            this.props.content,
                            ' '
                        ),
                        allData,
                        _react2.default.createElement(
                            'li',
                            { className: 'pop_bar cancel', onClick: this.handleClick.bind(this, 'cancel', '取消') },
                            '\u53D6\u6D88'
                        )
                    )
                )
            );
        }
    }]);

    return Popup;
}(_react2.default.Component);

// export default withStyles(styles)(Popup);


Popup.propTypes = {
    content: _propTypes2.default.string, // 组件提示文案
    onShow: _propTypes2.default.func, // 组件展示后回调函数
    onHide: _propTypes2.default.func, // 组件隐藏后回调函数
    onChoose: _propTypes2.default.func, // 选择某项后回调函数
    cancelTxt: _propTypes2.default.string, // 弹层取消按钮文案
    data: _propTypes2.default.array, // 弹层选项数组
    hideWhenMaskClick: _propTypes2.default.bool // 点击蒙层是否隐藏组件
};
Popup.defaultProps = {
    content: '提示',
    cancelTxt: '取消',
    data: [{ val: 'submit', text: '确定' }],
    hideWhenMaskClick: true,

    onHide: noop,
    onShow: noop,
    onChoose: noop
};
exports.default = Popup;
//# sourceMappingURL=index.js.map