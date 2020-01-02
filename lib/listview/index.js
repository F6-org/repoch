'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _transition = require('../dom-helper/util/transition');

require('./listview.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-env browser */


// import withStyles from '@repoch/with-styles';

var SCROLLER_CHECK_DURATION = 50;
var TOUCHMOVE_CHECK_DURATION = 500;
var PULL_MAX_DURATION = 200;
var PULLED_DOWN = 1;
var STATUS_DEFAULT = 11;
var STATUS_PREPARE = 12;
var STATUS_LOAD = 13;

var ListView = function (_React$Component) {
    _inherits(ListView, _React$Component);

    function ListView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListView.__proto__ || Object.getPrototypeOf(ListView)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
            _this._hasMounted = true;
            _this._draggable = true;
            _this._canTouchMove = false;

            _this.scrollCheckTimer = null;
            _this.touchMoveTriggerTimer = null;

            _this.wrapper = _reactDom2.default.findDOMNode(_this.refs.wrapper);
            _this.scroller = _reactDom2.default.findDOMNode(_this.refs.list);
            _this.createPullUpRegion();

            // 使用真实的时间，阻止ios页面bounce效果
            document.body.addEventListener('touchmove', _this.handleDocumentTouchMove);

            _this.wrapper.addEventListener('touchstart', _this.handleTouchStart);
            _this.wrapper.addEventListener('touchmove', _this.handleTouchMove);
            _this.wrapper.addEventListener('touchend', _this.handleTouchEnd);
            _this.wrapper.addEventListener('scroll', _this.handleScroll);
        }, _this.componentDidUpdate = function () {
            _this.createPullUpRegion();
        }, _this.componentWillUnmount = function () {
            _this._hasMounted = false;
            // 使用真实的时间，阻止ios页面bounce效果
            document.body.removeEventListener('touchmove', _this.handleDocumentTouchMove);

            _this.wrapper.removeEventListener('touchstart', _this.handleTouchStart);
            _this.wrapper.removeEventListener('touchmove', _this.handleTouchMove);
            _this.wrapper.removeEventListener('touchend', _this.handleTouchEnd);
            _this.wrapper.removeEventListener('scroll', _this.handleScroll);
        }, _this.createPullDownRegion = function () {
            _this.removePullDownRegion();
            _this.header = document.createElement('div');
            _this.header.className = 'latest';
            _this._touchCoords.status = _this.processLoaderStatus(PULLED_DOWN, 0, null, true);
            _this.wrapper.insertBefore(_this.header, _this.scroller);
            return _this.header;
        }, _this.removePullDownRegion = function () {
            if (_this.header) {
                _this.wrapper.removeChild(_this.header);
                _this.header = null;
            }
        }, _this.createPullUpRegion = function () {
            if (!_this.footer) {
                _this.footer = document.createElement('div');
                _this.wrapper.appendChild(_this.footer);
            }
            if (_this.wrapper.clientHeight >= _this.scroller.offsetHeight || _this.props.showNoContent) {
                // if (
                //     this.props.showNoContent
                // ) {
                _this.disablePullUp(true);
                _this.footer.className = 'loader';
                _this.footer.innerHTML = '<p class=\'non_cont\'>' + _this.props.content + '</p>';
                _this.footer.style.height = _this.props.threshold * 1.25 * 2 * 0.01 + 'rem';
            } else {
                _this.disablePullUp(false);
                _this.footer.className = 'loader';
                _this.footer.innerHTML = '' + '<div class=' + "loader" + '>' + '<em class=' + "pull-loading" + '></em>' + '<span>加载中...</span>' + '</div>';
                _this.footer.style.height = _this.props.threshold * 2 * 0.01 + 'rem';
            }
        }, _this.handleLoaderStatusChange = function (status) {
            var helper = _this.props.onLoaderStatusChange || function (status) {
                if (status === STATUS_DEFAULT) {
                    return '<div class="' + "loader" + '">' + '<em class="' + "pull-down" + '"></em>' + '<span>下拉刷新</span>' + '</div>';
                } else if (status === STATUS_PREPARE) {
                    return '<div class="' + "loader" + '"">' + '<em class="' + "pull-up" + '"></em>' + '<span>释放更新</span>' + '</div>';
                } else if (status === STATUS_LOAD) {
                    return '<div class="' + "loader" + '">' + '<em class="' + "pull-loading" + '"></em>' + '<span>加载中...</span>' + '</div>';
                }
            };

            if (_this.header && helper && typeof helper === 'function') {
                _this.header.innerHTML = helper.call(_this, status);
            }
        }, _this.processLoaderStatus = function (orient, offsetY, currentStatus, moved) {
            var overflow = void 0,
                nextStatus = currentStatus;
            if (orient === PULLED_DOWN) {
                overflow = offsetY > _this.props.threshold * 2;
                if (!overflow && currentStatus !== STATUS_DEFAULT) {
                    _this.handleLoaderStatusChange(STATUS_DEFAULT);
                    nextStatus = STATUS_DEFAULT;
                } else if (moved && overflow && currentStatus !== STATUS_PREPARE) {
                    _this.handleLoaderStatusChange(STATUS_PREPARE);
                    nextStatus = STATUS_PREPARE;
                } else if (!moved && overflow && currentStatus !== STATUS_LOAD) {
                    _this.handleLoaderStatusChange(STATUS_LOAD);
                    _this.props.onPullDown(_this.reset);
                    nextStatus = STATUS_LOAD;
                }
            }

            return nextStatus;
        }, _this.handleDocumentTouchMove = function (e) {
            var agent = navigator.userAgent.toLowerCase();
            if ((agent.indexOf("iphone") >= 0 || agent.indexOf("ipad") >= 0) && _this._touchCoords && _this._touchCoords.pullDown && e.isScroller) {
                // e.preventDefault();
                if (e.cancelable) {
                    // 判断默认行为是否已经被禁用
                    if (!e.preventDefault) {
                        e.preventDefault();
                    }
                }
            }
        }, _this.handleTouchStart = function (e) {
            _this._canTouchMove = false;
            var startScrollY = _this.wrapper.scrollTop;

            if (_this._draggable && (_this.props.isPullDownDisabled !== true || _this.isPullUpDisabled !== true)) {
                _this._draggable = false;
                _this._canTouchMove = true;

                var point = e.touches && e.touches[0];

                _this._pointX = point.pageX;
                _this._pointY = point.pageY;
                _this._startMove = true;

                _this._touchCoords = {};
                _this._touchCoords.startY = e.touches[0].screenY;
                _this._touchCoords.startScrollY = startScrollY;
            }
        }, _this.handleTouchMove = function (e) {
            e.isScroller = true;
            _this.touchMoveTriggerTimer && clearTimeout(_this.touchMoveTriggerTimer);

            if (_this._canTouchMove && _this.props.compatSlider && _this._startMove) {
                var point = e.touches && e.touches[0];
                var deltaX = point.pageX - _this._pointX;
                var deltaY = point.pageY - _this._pointY;

                _this._startMove = false;
                _this._canTouchMove = Math.abs(deltaX) > Math.abs(deltaY) ? false : true;
                _this._draggable = !_this._canTouchMove;
            }

            if (!_this._canTouchMove) return;
            // e.stopPropagation();

            var coords = _this._touchCoords;
            var startScrollY = coords.startScrollY;
            var blockY = coords.blockY;
            var startY = coords.startY;
            var stopY = e.touches[0].screenY;
            var offsetY = void 0,
                overY = void 0;

            if (typeof coords.canPullDown === 'undefined') {
                coords.canPullDown = _this.props.isPullDownDisabled !== true && startY < stopY && startScrollY <= 0;
            }
            if (coords.canPullDown && (coords.pullDown || startY - stopY + startScrollY < 0)) {
                // e.preventDefault(); 新版chrome对这块有处理
                coords.pullDown = true;
                if (!_this.header) {
                    _this.header = _this.createPullDownRegion();
                }
                if (typeof blockY === 'undefined') {
                    coords.blockY = blockY = stopY;
                }
                offsetY = stopY - blockY;
                offsetY = offsetY > 0 ? offsetY : 0;

                // 阻尼
                var threshold = _this.props.threshold;
                overY = offsetY - threshold;
                if (overY > 100) {
                    offsetY = threshold + 75 + (overY - 100) * 0.25;
                } else if (overY > 50) {
                    offsetY = threshold + 50 + (overY - 50) * 0.5;
                }
                _this.header.style.height = offsetY * 2 * 0.01 + 'rem';
                coords.status = _this.processLoaderStatus(PULLED_DOWN, offsetY, coords.status, true);
            } else {
                coords.blockY = stopY;
            }

            _this.touchMoveTriggerTimer = setTimeout(function () {
                _this.handleTouchEnd();
                _this.touchMoveTriggerTimer = null;
            }, TOUCHMOVE_CHECK_DURATION);
        }, _this.handleTouchEnd = function (e) {
            _this.touchMoveTriggerTimer && clearTimeout(_this.touchMoveTriggerTimer);
            _this.touchMoveTriggerTimer = null;

            if (!_this._canTouchMove) {
                return;
            } else {
                // e && e.stopPropagation();
            }

            _this._canTouchMove = false;
            _this.doTransition();
        }, _this.checkScrollEnd = function (node) {
            if (node.offsetHeight + node.scrollTop >= node.scrollHeight - _this.props.pullUpThreshold) {
                !_this.isPullUpDisabled && _this.props.onPullUp(_this.reset);
            }
            _this.scrollCheckTimer = null;
        }, _this.handleScroll = function (e) {
            _this.scrollCheckTimer && clearTimeout(_this.scrollCheckTimer);
            _this.scrollCheckTimer = setTimeout(_this.checkScrollEnd.bind(_this, e.target), SCROLLER_CHECK_DURATION);
        }, _this.handleTransitionEnd = function (orient, targetHeight) {
            var coords = _this._touchCoords;
            coords.status = _this.processLoaderStatus(orient, targetHeight, coords.status, false);
            if (!orient || coords.status !== STATUS_LOAD) {
                _this.removePullDownRegion();
                _this._touchCoords = null;
                _this._draggable = true;
                _this._canTouchMove = false;
            }
        }, _this.doTransition = function () {
            var coords = _this._touchCoords;
            if (!coords) return;
            var orient = coords.pullDown ? PULLED_DOWN : null;
            if (orient === PULLED_DOWN) {
                var target = _this.header;
                var targetHeight = target && target.offsetHeight || 0;
                var threshold = _this.props.threshold;
                var adjustHeight = targetHeight > threshold ? threshold : 0;

                var duration = (targetHeight - adjustHeight) / threshold * PULL_MAX_DURATION;
                duration = duration > PULL_MAX_DURATION ? PULL_MAX_DURATION : Math.ceil(duration);

                var endHandler = function endHandler() {
                    return _this.handleTransitionEnd(orient, targetHeight);
                };
                (0, _transition.listenTransition)(target, duration, endHandler);

                target.style[_transition.transition] = 'height ' + duration + 'ms';
                setTimeout(function () {
                    target.style.height = adjustHeight * 2 * 0.01 + 'rem';
                }, 0);
            } else {
                _this.handleTransitionEnd(orient, 0);
            }
        }, _this.reset = function () {
            if (!_this._hasMounted) return;
            _this.doTransition();
        }, _this.disablePullUp = function (disabled) {
            _this.isPullUpDisabled = disabled;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    // 禁止下拉刷新
    // isPullDownDisabled = true;

    // disablePullDown = disabled => {
    //     this.props.isPullDownDisabled = disabled;
    // }

    _createClass(ListView, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'wrapper', id: this.props.id, className: this.props.wrapperClassName + ' wrapper'

                },
                _react2.default.createElement(
                    'div',
                    { ref: 'list', className: this.props.scrollerClassName },
                    this.props.children
                )
            );
        }
    }]);

    return ListView;
}(_react2.default.Component);

ListView.propTypes = {
    threshold: _propTypes2.default.number, // 拖拽阈值
    pullUpThreshold: _propTypes2.default.number, // 上拉补偿值
    onLoaderStatusChange: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]), // 下拉样式处理函数
    showNoContent: _propTypes2.default.bool,
    isPullDownDisabled: _propTypes2.default.bool, //是否禁止下拉刷新功能，默认false不禁止
    content: _propTypes2.default.string,
    wrapperClassName: _propTypes2.default.string,
    scrollerClassName: _propTypes2.default.string,
    compatSlider: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    onPullDown: _propTypes2.default.func, // 刷新事件
    onPullUp: _propTypes2.default.func // 加载事件
};
ListView.defaultProps = {
    threshold: 40,
    pullUpThreshold: 40,
    onLoaderStatusChange: false,
    isPullDownDisabled: false,
    wrapperClassName: '' || 'component_wrapper_list',
    scrollerClassName: '' || 'component_scroller_list',
    showNoContent: false,
    compatSlider: false,
    id: 'listview',
    onPullDown: function onPullDown() {},
    onPullUp: function onPullUp() {}
};
exports.default = ListView;


ListView.scrollTo = function (scrollTop) {
    var node = document.getElementById('listview');
    if (node) {
        node.scrollTop = scrollTop + 'px';
    }
};

// export default withStyles(styles)(ListView);
//# sourceMappingURL=index.js.map