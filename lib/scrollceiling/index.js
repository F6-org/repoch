'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* @showCeilingH: 吸顶模块展示时，页面Y轴滑动的距离
* @loadMoreDatas：底部上滑加载更多内容
* @renderScrollCeilingTopNav：吸顶模块
* @showHandler: 吸顶模块吸顶时额外的交互 
* @hideHandler: 吸顶模块不吸顶时额外的交互
* 引用举例： 
    <ScrollCeiling
        showCeilingH={200}
        renderScrollCeilingTopNav={domRender}
        loadMoreDatas={null}
        showHandler={null}
        hideHandler={null}
        >
        <p>123456</p>
    </ScrollCeiling>
*/

var ScrollCeiling = function (_Component) {
    _inherits(ScrollCeiling, _Component);

    function ScrollCeiling(props) {
        _classCallCheck(this, ScrollCeiling);

        var _this = _possibleConstructorReturn(this, (ScrollCeiling.__proto__ || Object.getPrototypeOf(ScrollCeiling)).call(this, props));

        _this.lock = false;

        _this.componentWillMount = function () {};

        _this.componentDidMount = function () {};

        _this.componentWillUnmount = function () {};

        _this.checkCeiling = function () {
            var vT = -_this.virtualTop;
            if (vT >= _this.props.showCeilingH) {
                _this.refs.topnav.classList.add('show');
                _this.props.showHandler && _this.props.showHandler();
                _this.lock = false;
            } else {
                if (!_this.lock) {
                    _this.props.hideHandler && _this.props.hideHandler();
                    _this.lock = true;
                }
                _this.refs.topnav.classList.remove('show');
            }
        };

        _this.handleTouchStart = function (e) {
            if (_this.scrollAnimate) {
                window.cancelAnimationFrame(_this.scrollAnimate);
            }
            _this.checkCeiling();
            var y = e.touches[0].pageY,
                x = e.touches[0].pageX;

            _this.touchData.touchStartT = +new Date();
            _this.touchData.touchStartX = x;
            _this.touchData.touchStartY = y;
            _this.touchData.lastCurrent = y;
            _this.touchData.isTouch = false;
            _this.clickNav = false;
        };

        _this.handleTouchMove = function (e) {
            // this.clickNav = false
            _this.touchData.currentX = e.touches[0].pageX;
            _this.touchData.currentY = e.touches[0].pageY;
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
            if (_this.virtualTop >= 0 && _this.touchData.currentY - _this.touchData.touchStartY > 0) {
                //顶部下拉
                _this.topDragDown = true;
                _this.transformTo(0);
            } else {
                _this.topDragDown = false;
                var offset = _this.touchData.currentY - _this.touchData.lastCurrent;
                if (-_this.virtualTop > _reactDom2.default.findDOMNode(_this.refs.scrollpage).clientHeight - window.innerHeight) {
                    if (offset > 0) {
                        _this.transformTo(_this.virtualTop + offset);
                    } else {
                        _this.transformTo(_this.virtualTop);
                    }
                } else {
                    _this.transformTo(_this.virtualTop + offset);
                }
            }
            _this.touchData.deltaY = _this.touchData.currentY - _this.touchData.lastCurrent;
            _this.touchData.lastCurrent = _this.touchData.currentY;
            _this.touchData.touchMoveT = +new Date();
            _this.checkCeiling();
        };

        _this.handleTouchEnd = function (e) {
            var endT = +new Date();
            if (endT - _this.touchData.touchStartT < 300 && Math.abs(_this.touchData.lastCurrent - _this.touchData.touchStartY) < 30) return; //click
            _this.touchData.isTouch = true;
            if (_this.topDragDown) {
                _this.transformTo(0);
            } else {
                //calc endtop
                var velocity = _this.touchData.deltaY * 1 / (endT - _this.touchData.touchMoveT);
                var endTop = _this.virtualTop + Math.pow(velocity, 3);
                // Math.abs(velocity)// - Math.sqrt(Math.abs(velocity)))
                if (endTop >= 0) {
                    endTop = 0;
                } else if (endTop <= -_reactDom2.default.findDOMNode(_this.refs.scrollpage).clientHeight + window.innerHeight) {
                    endTop = -_reactDom2.default.findDOMNode(_this.refs.scrollpage).clientHeight + window.innerHeight;
                    //上滑加载更多数据
                    _this.props.loadMoreDatas && _this.props.loadMoreDatas();
                }
                _this.doAnimation(_this.virtualTop, endTop);
            }
            _this.checkCeiling();
        };

        _this.doAnimation = function (orign, target) {
            var realOffset = target - orign;
            var runWheelAnimate = function runWheelAnimate(t_delta) {
                if (!_this.scrollAnimateStart) _this.scrollAnimateStart = t_delta;
                var progress = t_delta - _this.scrollAnimateStart,
                    leftTime = 300,
                    t = +(progress / leftTime).toFixed(4),
                    delta = Math.ceil(_this.wheelBezier(t, [.8, .8], [.8, 1])[1] * realOffset);
                if (!_this.clickNav && orign + delta >= 0) {
                    //上滑至顶部
                    _this.transformTo(0);
                    window.cancelAnimationFrame(_this.scrollAnimate);
                } else {
                    if (t >= 1) {
                        _this.transformTo(target);
                    } else {
                        _this.transformTo(orign + delta);
                    }
                }
                !_this.clickNav && _this.checkCeiling();
                if (progress <= leftTime) {
                    window.requestAnimationFrame(runWheelAnimate);
                } else {
                    window.cancelAnimationFrame(_this.scrollAnimate);
                    _this.scrollAnimateStart = 0;
                }
            };
            _this.scrollAnimate = window.requestAnimationFrame(runWheelAnimate);
        };

        _this.touchData = {
            touchStartY: 0,
            touchStartX: 0,
            currentY: 0,
            currentX: 0,
            deltaY: 0,
            lastCurrent: 0,
            touchStartT: 0,
            touchMoveT: 0,
            isTouch: false
        };
        _this.clickNav = true;
        _this.virtualTop = 0;
        _this.topDragDown = false;
        return _this;
    }

    _createClass(ScrollCeiling, [{
        key: 'transformTo',
        value: function transformTo(top) {
            var curTop = top > 0 ? 0 : top;
            this.refs.scrollpage.style.WebkitTransform = 'translate(0,' + curTop + 'px' + ')';
            this.virtualTop = curTop;
        }
    }, {
        key: 'wheelBezier',
        value: function wheelBezier(t, mid1, mid2) {
            // 0 < t < 1
            var ps = [0, 0],
                pe = [1, 1];
            return [(1 - t) * (1 - t) * (1 - t) * ps[0] + 3 * (1 - t) * (1 - t) * t * mid1[0] + 3 * (1 - t) * t * t * mid2[0] + t * t * t * pe[0], (1 - t) * (1 - t) * (1 - t) * ps[1] + 3 * (1 - t) * (1 - t) * t * mid1[1] + 3 * (1 - t) * t * t * mid2[1] + t * t * t * pe[1]];
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'scroll-page-root' },
                _react2.default.createElement(
                    'div',
                    { className: 'scroll-page-wrapper', ref: 'scrollpage',
                        onTouchStart: this.handleTouchStart,
                        onTouchMove: this.handleTouchMove,
                        onTouchEnd: this.handleTouchEnd },

                    //页面
                    this.props.children
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'fixed-top', ref: 'topnav' },

                    //吸顶模块
                    this.props.renderScrollCeilingTopNav && this.props.renderScrollCeilingTopNav()
                )
            );
        }
    }]);

    return ScrollCeiling;
}(_react.Component);

ScrollCeiling.propTypes = {
    showCeilingH: _propTypes2.default.number.isRequired,
    // renderScrollCeilingTopNav: PropTypes.element.isRequired, //吸顶模块的渲染
    loadMoreDatas: _propTypes2.default.func, // 页面底部上滑，加载更多内容的回调函数 
    showHandler: _propTypes2.default.func, // 吸顶模块展示后的回调函数
    hideHandler: _propTypes2.default.func // 吸顶模块不展示后的回调函数
};
exports.default = ScrollCeiling;
//# sourceMappingURL=index.js.map