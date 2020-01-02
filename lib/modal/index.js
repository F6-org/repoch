'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

var _off = require('dom-helpers/events/off');

var _off2 = _interopRequireDefault(_off);

var _transition = require('../transition');

var _transition2 = _interopRequireDefault(_transition);

var _scrollPos = require('../dom-helper/dom/scroll-pos');

var _scrollPos2 = _interopRequireDefault(_scrollPos);

var _pipe = require('../pipe');

var _pipe2 = _interopRequireDefault(_pipe);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Modal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.getChildContext = function () {
            return {
                setMiddle: _this.setMiddle,
                setPosition: _this.setPosition
            };
        }, _this.state = {
            exited: !_this.props.show,
            l: 0,
            t: 0
        }, _this.componentWillReceiveProps = function (nextProps) {
            if (nextProps.show) {
                _this.setState({ exited: false });
            }
        }, _this.componentWillUpdate = function (nextProps) {}, _this.componentDidMount = function () {
            if (!_this.props.transition && _this.props.show) {
                _this.onShow();
            }

            if (_this.props.isMiddle) {
                _this.setMiddle(_reactDom2.default.findDOMNode(_this.refs.container));
            }

            if (!_this.props.isMiddle && _this.props.pos) {
                _this.setPosition(_this.props.pos);
            }
        }, _this.componentDidUpdate = function (prevProps) {
            var transition = _this.props.transition;


            if (prevProps.show && !_this.props.show && !transition) {
                _this.onHide();
            } else if (!prevProps.show && _this.props.show) {
                _this.onShow();
                if (_this.props.isMiddle) {
                    _this.setMiddle(_reactDom2.default.findDOMNode(_this.refs.container));
                }

                if (!_this.props.isMiddle && _this.props.pos) {
                    _this.setPosition(_this.props.pos);
                }
            }
        }, _this.componentWillUnmount = function () {
            if (!_this.props.transition && _this.props.show) {
                _this.onHide();
            }
        }, _this.renderBackMask = function () {
            var backdrop = _react2.default.createElement('div', { ref: 'backdrop',
                style: _this.props.maskStyle,
                className: _this.props.maskClassName,
                onClick: _this.handleBackdropClick });

            var tempMaskCss = _this.props.maskTransitionClassOpts;

            if (_this.props.transition) {
                backdrop = _react2.default.createElement(
                    _transition2.default,
                    _extends({
                        'in': _this.props.show,
                        timeout: 2000
                    }, tempMaskCss),
                    backdrop
                );
            }

            return backdrop;
        }, _this.handleBackdropClick = function (e) {
            if (e.target !== e.currentTarget) {
                return;
            }

            _this.props.onMaskClick();
        }, _this.onShow = function () {
            (0, _on2.default)(document.body, 'keyup', _this.handleDocumentKeyUp);
            _this.props.onShow();
        }, _this.onHide = function () {
            (0, _off2.default)(document.body, 'keyup', _this.handleDocumentKeyUp);
            _this.props.onHide();
            _this.setState({ exited: true });
        }, _this.getDialogElement = function () {
            var node = _this.refs.modal;
            return node && node.lastChild;
        }, _this.setMiddle = function (layerNode) {
            if (!layerNode) return;
            layerNode = layerNode.firstChild;

            var layerSize = {};
            layerSize.w = layerNode.offsetWidth;
            layerSize.h = layerNode.offsetHeight;

            var winSize = {};
            winSize.w = window.innerWidth;
            winSize.h = window.innerHeight;

            var _top = (0, _scrollPos2.default)().t + (winSize.h - layerSize.h) / 2;
            var _left = (winSize.w - layerSize.w) / 2;

            if (_top <= 10) {
                _top = 10;
            }

            _this.setState({ l: _left, t: _top });
        }, _this.setPosition = function () {
            var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { l: 0, t: 0 };

            _this.setState({ l: pos.l, t: pos.t });
        }, _this.handleDocumentKeyUp = function (e) {
            if (e.keyCode === 27) {
                _this.props.onEscapeKeyUp(e);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Modal, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                show = _props.show,
                transition = _props.transition,
                transitionClassOpts = _props.transitionClassOpts,
                maskStyle = _props.maskStyle,
                props = _objectWithoutProperties(_props, ['show', 'transition', 'transitionClassOpts', 'maskStyle']);

            var dialog = _react2.default.Children.only(this.props.children);

            var mountModal = show || transition && !this.state.exited;

            if (!mountModal) {
                return null;
            }
            if (transition) {
                dialog = _react2.default.createElement(
                    _transition2.default,
                    _extends({
                        ref: 'container',
                        'in': show,
                        timeout: 1000,
                        onExited: this.onHide,
                        onEntered: this.onShow
                    }, transitionClassOpts),
                    dialog
                );
            } else {
                dialog = _react2.default.createElement(
                    'div',
                    { ref: 'container' },
                    dialog
                );
            }

            var modal_style = {};
            if (this.props.isMiddle || this.props.pos) {
                modal_style = {
                    left: this.state.l,
                    top: this.state.t,
                    position: 'absolute'
                };
            }
            return _react2.default.createElement(
                _pipe2.default,
                { container: props.container || null },
                _react2.default.createElement(
                    'div',
                    {
                        ref: 'modal',
                        style: modal_style,
                        className: props.className
                    },
                    this.props.withMask && this.renderBackMask(),
                    _react2.default.createElement(
                        'div',
                        { style: { position: 'absolute', zIndex: this.props.zIndex }, className: props.className },
                        dialog
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react2.default.Component);

// export default withStyles(styles)(Modal);


Modal.propTypes = {
    show: _propTypes2.default.bool, // 展示 or 隐藏组件
    onShow: _propTypes2.default.func, // 展示组件后的回调
    onHide: _propTypes2.default.func, // 隐藏组件后的回调
    onEscapeKeyUp: _propTypes2.default.func, // 按ESC键的回调
    transition: _propTypes2.default.bool, // 是否动画过渡
    transitionClassOpts: _propTypes2.default.object, // 若采用动画过度，动画执行的参数
    maskTransitionClassOpts: _propTypes2.default.object, // 若采用动画过度，动画执行的参数
    maskStyle: _propTypes2.default.object, // 蒙层组件的内联样式
    onMaskClick: _propTypes2.default.func, // 点击蒙层以后的回调
    maskClassName: _propTypes2.default.string, // 蒙层组件的class名
    className: _propTypes2.default.string, // 组件的继承class
    isMiddle: _propTypes2.default.bool, // 是否居中显示
    withMask: _propTypes2.default.bool, // 是否有遮罩层
    children: _propTypes2.default.node, // 孩子节点
    pos: _propTypes2.default.object,
    zIndex: _propTypes2.default.string
};
Modal.defaultProps = {
    show: false,
    withMask: true,
    transition: false,
    transitionClassOpts: {
        exitedClassName: '',
        exitingClassName: '',
        enteredClassName: '',
        enteringClassName: ''
    },
    maskTransitionClassOpts: null,
    maskStyle: {},
    maskClassName: 'transparent_mask',
    isMiddle: false,

    onMaskClick: noop,
    onHide: noop,
    onShow: noop,
    onEscapeKeyUp: noop,

    className: '',
    pos: null,
    zIndex: "100010"
};
Modal.childContextTypes = {
    setMiddle: _propTypes2.default.func,
    setPosition: _propTypes2.default.func
};
exports.default = Modal;
//# sourceMappingURL=index.js.map