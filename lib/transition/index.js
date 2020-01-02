'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('./classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _properties = require('dom-helpers/transition/properties');

var _properties2 = _interopRequireDefault(_properties);

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionEndEvent = _properties2.default.end;

var UNMOUNTED = exports.UNMOUNTED = 0;
var EXITED = exports.EXITED = 1;
var ENTERING = exports.ENTERING = 2;
var ENTERED = exports.ENTERED = 3;
var EXITING = exports.EXITING = 4;

var Transition = function (_React$Component) {
    _inherits(Transition, _React$Component);

    function Transition(props, context) {
        _classCallCheck(this, Transition);

        var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, props, context));

        var initialStatus = void 0;
        if (props.in) {
            // Start enter transition in componentDidMount.
            initialStatus = props.transitionAppear ? EXITED : ENTERED;
        } else {
            initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
        }
        _this.state = { status: initialStatus };

        _this.nextCallback = null;
        return _this;
    }

    _createClass(Transition, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.transitionAppear && this.props.in) {
                this.performEnter(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var status = this.state.status;
            if (nextProps.in) {
                if (status === EXITING) {
                    this.performEnter(nextProps);
                } else if (this.props.unmountOnExit) {
                    if (status === UNMOUNTED) {
                        // Start enter transition in componentDidUpdate.
                        this.setState({ status: EXITED });
                    }
                } else if (status === EXITED) {
                    this.performEnter(nextProps);
                }

                // Otherwise we're already entering or entered.
            } else {
                if (status === ENTERING || status === ENTERED) {
                    this.performExit(nextProps);
                }

                // Otherwise we're already exited or exiting.
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.unmountOnExit && this.state.status === EXITED) {
                // EXITED is always a transitional state to either ENTERING or UNMOUNTED
                // when using unmountOnExit.
                if (this.props.in) {
                    this.performEnter(this.props);
                } else {
                    this.setState({ status: UNMOUNTED });
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.cancelNextCallback();
        }
    }, {
        key: 'performEnter',
        value: function performEnter(props) {
            var _this2 = this;

            this.cancelNextCallback();
            var node = _reactDom2.default.findDOMNode(this);

            // Not this.props, because we might be about to receive new props.
            props.onEnter(node);

            this.safeSetState({ status: ENTERING }, function () {
                _this2.props.onEntering(node);

                _this2.onTransitionEnd(node, function () {
                    _this2.safeSetState({ status: ENTERED }, function () {
                        _this2.props.onEntered(node);
                    });
                });
            });
        }
    }, {
        key: 'performExit',
        value: function performExit(props) {
            var _this3 = this;

            this.cancelNextCallback();
            var node = _reactDom2.default.findDOMNode(this);

            // Not this.props, because we might be about to receive new props.
            props.onExit(node);

            this.safeSetState({ status: EXITING }, function () {
                _this3.props.onExiting(node);

                _this3.onTransitionEnd(node, function () {
                    _this3.safeSetState({ status: EXITED }, function () {
                        _this3.props.onExited(node);
                    });
                });
            });
        }
    }, {
        key: 'cancelNextCallback',
        value: function cancelNextCallback() {
            if (this.nextCallback !== null) {
                this.nextCallback.cancel();
                this.nextCallback = null;
            }
        }
    }, {
        key: 'safeSetState',
        value: function safeSetState(nextState, callback) {
            // This shouldn't be necessary, but there are weird race conditions with
            // setState callbacks and unmounting in testing, so always make sure that
            // we can cancel any pending setState callbacks after we unmount.
            this.setState(nextState, this.setNextCallback(callback));
        }
    }, {
        key: 'setNextCallback',
        value: function setNextCallback(callback) {
            var _this4 = this;

            var active = true;

            this.nextCallback = function (event) {
                if (active) {
                    active = false;
                    _this4.nextCallback = null;

                    callback(event);
                }
            };

            this.nextCallback.cancel = function () {
                active = false;
            };

            return this.nextCallback;
        }
    }, {
        key: 'onTransitionEnd',
        value: function onTransitionEnd(node, handler) {
            this.setNextCallback(handler);

            if (node) {
                (0, _on2.default)(node, transitionEndEvent, this.nextCallback);
                setTimeout(this.nextCallback, this.props.timeout);
            } else {
                setTimeout(this.nextCallback, 0);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var status = this.state.status;
            if (status === UNMOUNTED) {
                return null;
            }

            var _props = this.props,
                children = _props.children,
                className = _props.className,
                childProps = _objectWithoutProperties(_props, ['children', 'className']);

            Object.keys(Transition.propTypes).forEach(function (key) {
                return delete childProps[key];
            });

            var transitionClassName = void 0;
            if (status === EXITED) {
                transitionClassName = this.props.exitedClassName;
            } else if (status === ENTERING) {
                transitionClassName = this.props.enteringClassName;
            } else if (status === ENTERED) {
                transitionClassName = this.props.enteredClassName;
            } else if (status === EXITING) {
                transitionClassName = this.props.exitingClassName;
            }

            var child = _react2.default.Children.only(children);
            // child = (
            //     <div>
            //         { child }
            //     </div>
            // );

            return _react2.default.cloneElement(child, _extends({}, childProps, {
                className: (0, _classnames2.default)(child.props.className, className, transitionClassName)
            }));
        }
    }]);

    return Transition;
}(_react2.default.Component);

exports.default = Transition;


Transition.propTypes = {
    /**
     * 展示 or 隐藏组件
     */
    in: _propTypes2.default.bool,

    /**
     * 是否在不展示组件后销毁组件
     */
    unmountOnExit: _propTypes2.default.bool,

    /**
     * 组件初次渲染时，是否执行动画
     */
    transitionAppear: _propTypes2.default.bool,

    /**
     * 动画的执行延迟，用来确保节点可执行，初始值为5秒，适当设置
     */
    timeout: _propTypes2.default.number,

    /**
     * 组件退出后的class
     */
    exitedClassName: _propTypes2.default.string,
    /**
     * 组件退出过程中的class
     */
    exitingClassName: _propTypes2.default.string,
    /**
     * 组件渲染后的class
     */
    enteredClassName: _propTypes2.default.string,
    /**
     * 组件渲染过程中的class
     */
    enteringClassName: _propTypes2.default.string,

    /**
     * 组件设置渲染中class之前的回调
     */
    onEnter: _propTypes2.default.func,
    /**
     * 组件设置渲染中class之后的回调
     */
    onEntering: _propTypes2.default.func,
    /**
     * 组件设置渲染后的class之后的回调
     */
    onEntered: _propTypes2.default.func,
    /**
     * 组件设置退出过程中的class之前的回调
     */
    onExit: _propTypes2.default.func,
    /**
     * 组件设置退出过程中的class之后的回调
     */
    onExiting: _propTypes2.default.func,
    /**
     * 组件设置退出后的class之后的回调
     */
    onExited: _propTypes2.default.func
};

function noop() {}

Transition.displayName = 'Transition';

Transition.defaultProps = {
    in: false,
    unmountOnExit: false,
    transitionAppear: true,

    timeout: 5000,

    onEnter: noop,
    onEntering: noop,
    onEntered: noop,

    onExit: noop,
    onExiting: noop,
    onExited: noop
};
//# sourceMappingURL=index.js.map