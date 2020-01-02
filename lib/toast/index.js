'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * show: bool
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * text: string或dom皆可
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * icon:'info/success/error/loading'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * autoHideDuration:INT 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * afterClose: ()=>{}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// import classNames from 'classnames';

var Toast = function (_Component) {
    _inherits(Toast, _Component);

    function Toast() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Toast);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.handleTouch = function (e) {

            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.nativeEvent.preventDefault();
            return false;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Toast, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.show != nextProps.show || this.props.text != nextProps.text;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.timer && clearTimeout(this.timer);
            this.timer = null;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            var _props = this.props,
                _props$autoHideDurati = _props.autoHideDuration,
                autoHideDuration = _props$autoHideDurati === undefined ? 3000 : _props$autoHideDurati,
                afterClose = _props.afterClose,
                show = _props.show;

            if (show) {
                this.timer = setTimeout(function () {
                    _this2.timer && clearTimeout(_this2.timer);
                    _this2.timer = null;

                    afterClose && afterClose();
                }, autoHideDuration);
            }
        }
    }, {
        key: 'checkType',
        value: function checkType() {
            var params = [].slice.call(arguments);
            var data = params[0];
            var types = params.slice(1);
            var _type = {}.toString.call(data).split(/\s|\]|\[/)[2].toLowerCase();
            return types.length ? types.some(function (type) {
                return _type.indexOf(type.toLowerCase());
            }) > -1 : _type;
        }
    }, {
        key: 'renderToast',
        value: function renderToast() {
            var props = this.props;
            var _props$className = props.className,
                className = _props$className === undefined ? "" : _props$className,
                _props$icon = props.icon,
                icon = _props$icon === undefined ? 'info' : _props$icon,
                text = props.text,
                _props$bgColor = props.bgColor,
                bgColor = _props$bgColor === undefined ? 'rgba(51,51,51,.8)' : _props$bgColor;


            return _react2.default.createElement(
                'div',
                { className: 'c-toast-root ' + className, style: this.getData('rootStyle')(bgColor) },
                _react2.default.createElement(
                    'div',
                    { className: 'icon' },
                    this.getData('icon')(icon)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text' },
                    text
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                show = _props2.show,
                _props2$className = _props2.className,
                className = _props2$className === undefined ? "" : _props2$className;

            return _react2.default.createElement(
                'div',
                { className: 'c-toast-wrapper ' + className + ' ' + (show ? "in" : "out"),
                    onTouchMove: function onTouchMove(e) {
                        return _this3.handleTouch(e);
                    },
                    onTouchEnd: function onTouchEnd(e) {
                        return _this3.handleTouch(e);
                    }
                },
                this.renderToast()
            );
        }
    }, {
        key: 'getData',
        value: function getData(type) {
            var _this4 = this;

            return {
                'rootStyle': function rootStyle(bgColor) {
                    return {
                        background: bgColor
                    };
                },
                'icon': function icon(_icon) {
                    if (!_this4.checkType(_icon, 'string')) {
                        return _icon;
                    }
                    return {
                        'info': _react2.default.createElement('i', { className: 'i-icon icon-info-circle' }),
                        'success': _react2.default.createElement('i', { className: 'i-icon icon-check-circle' }),
                        'error': _react2.default.createElement('i', { className: 'i-icon icon-error-circle' }),
                        'loading': _react2.default.createElement('i', { className: 'i-icon icon-loading' })
                    }[_icon];
                }
            }[type];
        }
    }]);

    return Toast;
}(_react.Component);

exports.default = Toast;
//# sourceMappingURL=index.js.map