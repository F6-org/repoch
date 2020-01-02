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

require('./slider-n.css');

var _swipe = require('./swipe');

var _swipe2 = _interopRequireDefault(_swipe);

var _equal = require('../equal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewSlider = function (_React$Component) {
    _inherits(NewSlider, _React$Component);

    function NewSlider() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NewSlider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewSlider.__proto__ || Object.getPrototypeOf(NewSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            selectedIndex: _this.props.startSlide
        }, _this.componentDidMount = function () {
            _this.swipe = (0, _swipe2.default)(_this.dom, _extends({}, _this.props, { callback: _this.handleCallBack() }));
        }, _this.componentDidUpdate = function (prevProps) {
            if (_this.props.reinitSwipeOnUpdate || _this.props.children.length !== prevProps.children.length) {
                _this.swipe.kill();
                _this.swipe = (0, _swipe2.default)(_this.dom, _extends({}, _this.props, { callback: _this.handleCallBack() }));
            }

            if (_this.props.slideToIndex || _this.props.slideToIndex === 0) {
                _this.swipe.slide(_this.props.slideToIndex);
            }
        }, _this.componentWillUnmount = function () {
            _this.swipe.kill();
            _this.swipe = null;
        }, _this.shouldComponentUpdate = function (nextProps) {
            return _this.props.slideToIndex != nextProps.slideToIndex || _this.props.shouldUpdate && typeof _this.props.shouldUpdate === 'function' && _this.props.shouldUpdate(nextProps, _this.props) || !(0, _equal.isSame)(nextProps.children, _this.props.children);
        }, _this.componentWillReceiveProps = function (nextProps) {
            // 属性变化时不重绘slider
            if (_this.props.children.length !== nextProps.children.length || nextProps.reinitSwipeOnUpdate) {
                _this.setState({ selectedIndex: _this.props.startSlide });
            }
        }, _this.handleCallBack = function () {
            // arrow function 是定义时所在对象，所以此处不指向component,需要这么搞
            var self = _this;
            return function (index) {
                if (index >= self.props.children.length) {
                    index = index % self.props.children.length;
                }

                self.props.onSliderChange(index);
                self.setState({ selectedIndex: Number(index) });
                self.forceUpdate();
            };
        }, _this.handleDotClick = function (index) {
            _this.swipe && _this.swipe.slide(index);
        }, _this.buildSliders = function () {
            if (!_this.props.children.length) return null;
            // 当需要循环时，需要复制两个来适配循环播放
            if (_this.props.continuous && _this.props.children.length === 2) {
                var temp = _this.props.children.map(function (child, i) {
                    return _react2.default.cloneElement(child, {
                        className: "child",
                        key: i + _this.props.children.length
                    });
                });
                return temp.concat(temp.map(function (child, i) {
                    return _react2.default.cloneElement(child, {
                        className: "child",
                        key: i
                    });
                }));
            }

            return _this.props.children.map(function (child, i) {
                return _react2.default.cloneElement(child, {
                    className: "child",
                    key: i
                });
            });
        }, _this.buildDots = function () {
            if (!_this.props.withDotted || _this.props.children.length < 2) {
                return null;
            }

            var _styles = _this.props.slideStyles || "";

            var children = Array.apply(null, Array(_this.props.children.length)).map(function (item, i) {
                if (i === _this.state.selectedIndex) {
                    return _react2.default.createElement('span', { key: i,
                        className: 'dots dots_active ' + _styles,
                        onClick: _this.handleDotClick.bind(_this, i) });
                } else {
                    return _react2.default.createElement('span', { key: i,
                        className: 'dots ' + _styles,
                        onClick: _this.handleDotClick.bind(_this, i) });
                }
            });
            return _react2.default.createElement(
                'div',
                { className: 'dots_wrapper ' + _this.props.dotsWrapClass },
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NewSlider, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { ref: function ref(e) {
                        return _this2.dom = e;
                    }, style: _extends({}, this.props.containerStyles), className: 'slider-n-container' },
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, this.props.wrapperStyles), className: 'slider-n-wrapper ' + this.props.wrapperClass },
                    this.buildSliders()
                ),
                this.buildDots()
            );
        }
    }]);

    return NewSlider;
}(_react2.default.Component);

NewSlider.propTypes = {
    auto: _propTypes2.default.number, // 自动slider开始时间
    speed: _propTypes2.default.number, // slider切换时间
    startSlide: _propTypes2.default.number, // 起始slider位置
    slideToIndex: _propTypes2.default.number, // 设置渲染完成后slider到哪个位置
    continuous: _propTypes2.default.bool, // 是否循环
    disableScroll: _propTypes2.default.bool, // 阻止全部该容器下的touch事件
    stopPropagation: _propTypes2.default.bool, // 阻止事件冒泡
    reinitSwipeOnUpdate: _propTypes2.default.bool, // 组件更新时是否重新初始化
    wrapperStyles: _propTypes2.default.object, // slider外层样式
    wrapperClass: _propTypes2.default.string, // slider外层类名
    containerStyles: _propTypes2.default.object, // 容器样式
    sliderStyles: _propTypes2.default.object, // 样式
    shouldUpdate: _propTypes2.default.func, // 自定义是否重绘方法
    onSliderChange: _propTypes2.default.func, // slider切换时的回调函数
    transitionEnd: _propTypes2.default.func, // 动画执行后的回调函数
    isInSlider: _propTypes2.default.func, // 是否在slider内部滑动
    withDotted: _propTypes2.default.bool, // 是否需要显示点点点
    dotsWrapClass: _propTypes2.default.string //底部滚动点点点的样式
};
NewSlider.defaultProps = {
    isInSlider: function isInSlider() {
        return null;
    },
    withDotted: true,
    onSliderChange: function onSliderChange() {
        return null;
    },
    startSlide: 0
};
exports.default = NewSlider;
//# sourceMappingURL=index.js.map