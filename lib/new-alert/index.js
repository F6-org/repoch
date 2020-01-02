'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _newMask = require('../new-mask');

var _newMask2 = _interopRequireDefault(_newMask);

require('./index.style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //弹窗样式为 两个按钮（左右排列）；当按钮文案传空时，不展示此按钮
//<Alert
//    show={true} //控制显示隐藏
//    title={"huhuhuh"}
//    content={`<p class="f-16">本次参与<i class="f-c-highlight">${must_buy_number}</i>人次</p>`}, //可以传dom节点进去
//    detail="123123123" //副标题
//    onOk={e => console.log(123)}
//    onCancel={e => console.log(123444)}
///>

function noop() {}

var Alert = function (_Component) {
	_inherits(Alert, _Component);

	function Alert() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Alert);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Alert.__proto__ || Object.getPrototypeOf(Alert)).call.apply(_ref, [this].concat(args))), _this), _this.handleMaskClick = function () {
			if (!_this.props.hideWhenMaskClick) return;
			_this.props.hideFun && _this.props.hideFun();
		}, _this.handleClick = function () {
			_this.props.onOk && _this.props.onOk();
			_this.props.hideFun && _this.props.hideFun();
		}, _this.handleCancel = function () {
			_this.props.onCancel && _this.props.onCancel();
			_this.props.hideFun && _this.props.hideFun();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Alert, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    cancelText = _props.cancelText,
			    okText = _props.okText,
			    content = _props.content,
			    title = _props.title,
			    detail = _props.detail,
			    children = _props.children;

			return _react2.default.createElement(
				_newMask2.default,
				{ show: this.props.show, close: this.handleMaskClick, disableTouchMove: true },
				_react2.default.createElement(
					'div',
					{ className: 'v-alert-root ' + (this.props.show ? 'show' : '') },
					_react2.default.createElement(
						'div',
						{ className: detail || content || children ? 'alert-txt-wrapper' : 'alert-txt-wrapper alert-txt-wrapper-special' },
						_react2.default.createElement(
							'h3',
							{ className: 'title' },
							title
						),
						_react2.default.createElement(
							'p',
							{ className: 'detail' },
							detail
						),
						_react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: content } }),
						_react2.default.Children.toArray(children)
					),
					_react2.default.createElement(
						'div',
						{ className: 'alert-btn-wrapper' },
						cancelText && _react2.default.createElement(
							'a',
							{ className: 'btn-cancel', onClick: this.handleCancel },
							cancelText
						),
						okText && _react2.default.createElement(
							'a',
							{ className: 'btn-ok', onClick: this.handleClick },
							okText
						)
					)
				)
			);
		}
	}]);

	return Alert;
}(_react.Component);

Alert.propTypes = {
	show: _propTypes2.default.bool.isRequired,
	title: _propTypes2.default.string.isRequired,
	detail: _propTypes2.default.string.isRequired,
	content: _propTypes2.default.string.isRequired,
	onShow: _propTypes2.default.func, // 组件展示后回调函数
	onHide: _propTypes2.default.func, // 组件隐藏后回调函数
	onOk: _propTypes2.default.func, // 点击按钮后回调
	okText: _propTypes2.default.string, // 按钮文案
	onCancel: _propTypes2.default.func, // 点击按钮后回调
	cancelText: _propTypes2.default.string, // 按钮文案
	hideWhenMaskClick: _propTypes2.default.bool // 点击背景是否隐藏
};
Alert.defaultProps = {
	show: false,
	title: '标题',
	detail: '',
	content: '',
	okText: '确定',
	cancelText: '取消',
	onHide: noop,
	onShow: noop,
	onOk: noop,
	onCancel: noop,
	hideWhenMaskClick: true
};
exports.default = Alert;
//# sourceMappingURL=index.js.map