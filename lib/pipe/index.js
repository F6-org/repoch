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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getContainer(container, defaultContainer) {
    container = typeof container === 'function' ? container() : container;
    return _reactDom2.default.findDOMNode(container) || defaultContainer;
}

var Pipe = function (_React$Component) {
    _inherits(Pipe, _React$Component);

    function Pipe() {
        _classCallCheck(this, Pipe);

        return _possibleConstructorReturn(this, (Pipe.__proto__ || Object.getPrototypeOf(Pipe)).apply(this, arguments));
    }

    _createClass(Pipe, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._renderOverlay();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._renderOverlay();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._unrenderOverlay();
            this._unmountOverlayTarget();
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: '_mountOverlayTarget',
        value: function _mountOverlayTarget() {
            if (!this._overlayTarget) {
                this._overlayTarget = document.createElement('div');
                this.getContainerDOMNode().appendChild(this._overlayTarget);
            }
        }
    }, {
        key: '_unmountOverlayTarget',
        value: function _unmountOverlayTarget() {
            if (this._overlayTarget) {
                this.getContainerDOMNode().removeChild(this._overlayTarget);
                this._overlayTarget = null;
            }
        }
    }, {
        key: '_renderOverlay',
        value: function _renderOverlay() {
            var overlay = !this.props.children ? null : _react2.default.Children.only(this.props.children);

            // Save reference for future access.
            if (overlay !== null) {
                this._mountOverlayTarget();
                this._overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, overlay, this._overlayTarget);
            } else {
                // Unrender if the component is null for transitions to null
                this._unrenderOverlay();
                this._unmountOverlayTarget();
            }
        }
    }, {
        key: '_unrenderOverlay',
        value: function _unrenderOverlay() {
            if (this._overlayTarget) {
                _reactDom2.default.unmountComponentAtNode(this._overlayTarget);
                this._overlayInstance = null;
            }
        }
    }, {
        key: 'getMountNode',
        value: function getMountNode() {
            return this._overlayTarget;
        }
    }, {
        key: 'getOverlayDOMNode',
        value: function getOverlayDOMNode() {
            if (!this.isMounted()) {
                throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
            }

            if (this._overlayInstance) {
                if (this._overlayInstance.getWrappedDOMNode) {
                    return this._overlayInstance.getWrappedDOMNode();
                } else {
                    return _reactDom2.default.findDOMNode(this._overlayInstance);
                }
            }

            return null;
        }
    }, {
        key: 'getContainerDOMNode',
        value: function getContainerDOMNode() {
            return getContainer(this.props.container, document.body);
        }
    }]);

    return Pipe;
}(_react2.default.Component);

Pipe.propTypes = {
    container: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func, _propTypes2.default.element, _propTypes2.default.any]),
    children: _propTypes2.default.node
};
exports.default = Pipe;


Pipe.displayName = 'Pipe';
//# sourceMappingURL=index.js.map