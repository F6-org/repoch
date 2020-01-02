'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./layer.style.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../mask/index.jsx');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // components


var Dialog = function (_React$Component) {
    _inherits(Dialog, _React$Component);

    function Dialog(props) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

        _this.timer = null;
        _this.dom = {};

        _this.state = {
            style: {}
        };
        return _this;
    }

    // componentDidMount() {
    // }


    _createClass(Dialog, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
        //clearTimeout(this.timer);
        //this.timer = null
        // window.removeEventListener('resize', this.handleResize.bind(this));


        // componentDidMount() {
        //     window.addEventListener('resize', this.handleResize.bind(this));
        // }

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            document.body.style.overflow = this.props.show ? 'hidden' : "";

            var dom = this.dom.content;

            if (this.props.show) {
                // $(dom).removeClass('transparent')
                dom.classList.remove('transparent');
            } else {
                // $(dom).addClass('transparent');
                dom.classList.add('transparent');
            }
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.nativeEvent.preventDefault();
        }
    }, {
        key: 'onClose',
        value: function onClose(e) {
            this.props.onClose && this.props.onClose();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                title = _props.title,
                actions = _props.actions,
                children = _props.children,
                className = _props.className,
                show = _props.show;


            return _react2.default.createElement(
                'div',
                { className: 'dialog-wrapper ' + className,
                    onTouchMove: function onTouchMove(e) {
                        return _this2.handleTouchMove(e);
                    }
                    // style={{ display: this.props.show ? "initial" : 'none' }}
                },
                _react2.default.createElement(
                    'div',
                    { ref: function ref(e) {
                            return _this2.dom.content = e;
                        }, className: (show ? '' : 'transparent') + ' dialog-content' },
                    _react2.default.Children.toArray(children)
                ),
                _react2.default.createElement(_index2.default, { show: show,
                    onClose: function onClose(e) {
                        _this2.onClose(e);
                    }
                })
            );
        }
    }]);

    return Dialog;
}(_react2.default.Component);

exports.default = Dialog;
//# sourceMappingURL=index.js.map