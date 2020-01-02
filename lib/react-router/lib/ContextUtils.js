'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextProvider = ContextProvider;
exports.ContextSubscriber = ContextSubscriber;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Works around issues with context updates failing to propagate.
// Caveat: the context value is expected to never change its identity.
// https://github.com/facebook/react/issues/2517
// https://github.com/reactjs/react-router/issues/470

var contextProviderShape = _propTypes2.default.shape({
  subscribe: _propTypes2.default.func.isRequired,
  eventIndex: _propTypes2.default.number.isRequired
});

function makeContextName(name) {
  return '@@contextSubscriber/' + name;
}

function ContextProvider(name) {
  var contextName = makeContextName(name);
  var listenersKey = contextName + '/listeners';
  var eventIndexKey = contextName + '/eventIndex';
  var subscribeKey = contextName + '/subscribe';

  return _defineProperty({
    childContextTypes: _defineProperty({}, contextName, contextProviderShape.isRequired),

    getChildContext: function getChildContext() {
      return _defineProperty({}, contextName, {
        eventIndex: this[eventIndexKey],
        subscribe: this[subscribeKey]
      });
    },
    componentWillMount: function componentWillMount() {
      this[listenersKey] = [];
      this[eventIndexKey] = 0;
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
      this[eventIndexKey]++;
    },
    componentDidUpdate: function componentDidUpdate() {
      var _this = this;

      this[listenersKey].forEach(function (listener) {
        return listener(_this[eventIndexKey]);
      });
    }
  }, subscribeKey, function (listener) {
    var _this2 = this;

    // No need to immediately call listener here.
    this[listenersKey].push(listener);

    return function () {
      _this2[listenersKey] = _this2[listenersKey].filter(function (item) {
        return item !== listener;
      });
    };
  });
}

function ContextSubscriber(name) {
  var contextName = makeContextName(name);
  var lastRenderedEventIndexKey = contextName + '/lastRenderedEventIndex';
  var handleContextUpdateKey = contextName + '/handleContextUpdate';
  var unsubscribeKey = contextName + '/unsubscribe';

  return _defineProperty({
    contextTypes: _defineProperty({}, contextName, contextProviderShape),

    getInitialState: function getInitialState() {
      if (!this.context[contextName]) {
        return {};
      }

      return _defineProperty({}, lastRenderedEventIndexKey, this.context[contextName].eventIndex);
    },
    componentDidMount: function componentDidMount() {
      if (!this.context[contextName]) {
        return;
      }

      this[unsubscribeKey] = this.context[contextName].subscribe(this[handleContextUpdateKey]);
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
      if (!this.context[contextName]) {
        return;
      }

      this.setState(_defineProperty({}, lastRenderedEventIndexKey, this.context[contextName].eventIndex));
    },
    componentWillUnmount: function componentWillUnmount() {
      if (!this[unsubscribeKey]) {
        return;
      }

      this[unsubscribeKey]();
      this[unsubscribeKey] = null;
    }
  }, handleContextUpdateKey, function (eventIndex) {
    if (eventIndex !== this.state[lastRenderedEventIndexKey]) {
      this.setState(_defineProperty({}, lastRenderedEventIndexKey, eventIndex));
    }
  });
}
//# sourceMappingURL=ContextUtils.js.map