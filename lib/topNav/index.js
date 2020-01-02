'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopNav = function (_React$Component) {
    _inherits(TopNav, _React$Component);

    function TopNav(props) {
        _classCallCheck(this, TopNav);

        var _this = _possibleConstructorReturn(this, (TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call(this, props));

        _this.componentDidUpdate = function () {
            _this.setContainerScrollLeft(_this.props.selected_index);
        };

        _this.buildMenuList = function () {
            return _this.props.menuList.map(function (item, i) {
                if (_this.props.selected_index === i) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'm-cur', key: i },
                        _react2.default.createElement(
                            'span',
                            null,
                            item.name,
                            _react2.default.createElement('em', null)
                        )
                    );
                }

                return _react2.default.createElement(
                    'li',
                    { onClick: _this.handleItemClick.bind(_this, i), key: i },
                    _react2.default.createElement(
                        'span',
                        null,
                        item.name
                    )
                );
            });
        };

        _this.handleItemClick = function (index, e) {
            _this.props.onChangeNav(index);
        };

        _this.setContainerScrollLeft = function (index) {
            var allLi = _this.nav_container.querySelectorAll('li');
            var container_w = _this.nav_container.clientWidth;
            var w = 0;
            var originOffsetW = _this.nav_container.scrollLeft;
            var offsetW = 0;

            for (var i = 0, len = allLi.length; i < len; i++) {
                w += allLi[i].offsetWidth;
                if (i >= index) {
                    break;
                }
            }

            offsetW = w - container_w + container_w / 3;
            offsetW = offsetW < 0 ? 0 : offsetW;

            _this.doAnimation(originOffsetW, offsetW);
        };

        _this.doAnimation = function (originOffsetW, offsetW) {
            var realOffset = offsetW - originOffsetW;
            var step = realOffset / 15;
            var that = _this;
            var count = 0;

            function animateFunc() {
                count++;
                if (!that.nav_container) {
                    return;
                }

                that.nav_container.scrollLeft += step;
                if (count < 15) {
                    window.requestAnimationFrame(animateFunc);
                }
            }

            window.requestAnimationFrame(animateFunc);
        };

        _this.state = {
            menuList: [],
            selected_index: 0,
            onChangeNav: function onChangeNav() {
                return null;
            }
        };
        return _this;
    }

    _createClass(TopNav, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'm-top-nav' },
                _react2.default.createElement(
                    'div',
                    { className: 'm-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'm-box-col nav-main' },
                        _react2.default.createElement(
                            'div',
                            { className: 'scroll-box', ref: function ref(e) {
                                    return _this2.nav_container = e;
                                } },
                            _react2.default.createElement(
                                'ul',
                                _defineProperty({ className: 'E_f14' }, 'className', 'nav-item'),
                                this.buildMenuList()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return TopNav;
}(_react2.default.Component);

// export default withStyles(styles)(TopNav);


exports.default = TopNav;
//# sourceMappingURL=index.js.map