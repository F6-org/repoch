'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AsyncUtils = require('./AsyncUtils');

var _PathUtils = require('./PathUtils');

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _Actions = require('./Actions');

var _DOMStateStorage = require('./DOMStateStorage');

var _LocationUtils = require('./LocationUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHistory = function createHistory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getCurrentLocation = options.getCurrentLocation,
      getUserConfirmation = options.getUserConfirmation,
      pushLocation = options.pushLocation,
      replaceLocation = options.replaceLocation,
      go = options.go,
      keyLength = options.keyLength;


  var currentLocation = void 0;
  var pendingLocation = void 0;
  var beforeListeners = [];
  var listeners = [];
  var locationsHistories = (0, _DOMStateStorage.readState)("locationsHistories") || [];
  var status = void 0;

  var getCurrentIndex = function getCurrentIndex() {
    var index = -1;
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      locationsHistories.forEach(function (loc, idx) {
        if (index === -1 && loc.key === pendingLocation.key) {
          index = idx;
        }
      });
    }

    if (currentLocation) {
      locationsHistories.forEach(function (loc, idx) {
        if (index === -1 && loc.key === currentLocation.key) {
          index = idx;
        }
      });
    }

    return index;
  };

  var updateLocation = function updateLocation(nextLocation) {
    var currentIndex = getCurrentIndex();
    currentLocation = nextLocation;
    if (currentLocation.action === _Actions.PUSH) {
      locationsHistories = [].concat(locationsHistories.slice(0, currentIndex + 1), [currentLocation]);
      (0, _DOMStateStorage.saveState)("locationsHistories", locationsHistories);
    } else if (currentLocation.action === _Actions.REPLACE) {
      if (currentIndex < 0 && locationsHistories.length === 0) {
        currentIndex = 0;
      }
      locationsHistories[currentIndex] = currentLocation;
      (0, _DOMStateStorage.saveState)("locationsHistories", locationsHistories);
    }

    listeners.forEach(function (listener) {
      return listener(currentLocation);
    });
  };

  var listenBefore = function listenBefore(listener) {
    beforeListeners.push(listener);

    return function () {
      return beforeListeners = beforeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var listen = function listen(listener) {
    listeners.push(listener);

    currentLocation = getCurrentLocation();
    // if a new navigation, reset history
    if (currentLocation.key === null) {
      currentLocation = createLocation(getCurrentLocation(), _Actions.POP, createKey());
      replaceLocation(currentLocation);
      locationsHistories = [currentLocation];
      (0, _DOMStateStorage.saveState)("locationsHistories", locationsHistories);
    }

    return function () {
      return listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
        return result != null ? done(result) : next();
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          return callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  };

  var transitionTo = function transitionTo(nextLocation) {
    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation

      status = currentLocation && currentLocation.key > nextLocation.key ? 0 : 1;

      pendingLocation = null;

      if (ok) {
        // Treat PUSH to same path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = (0, _PathUtils.createPath)(currentLocation);
          var nextPath = (0, _PathUtils.createPath)(nextLocation);

          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
        }

        if (nextLocation.action === _Actions.POP) {
          updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.PUSH) {
          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.REPLACE) {
          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
        }
      } else if (currentLocation && nextLocation.action === _Actions.POP) {
        var prevIndex = -1;
        var nextIndex = -1;
        locationsHistories.forEach(function (loc, idx) {
          if (prevIndex === -1 && loc.key === currentLocation.key) {
            prevIndex = idx;
          }
          if (nextIndex === -1 && loc.key === nextLocation.key) {
            nextIndex = idx;
          }
        });
        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
      }
    });
  };

  var push = function push(input) {
    return transitionTo(createLocation(input, _Actions.PUSH));
  };

  var replace = function replace(input) {
    var currentIndex = getCurrentIndex();
    transitionTo(createLocation(input, _Actions.REPLACE, locationsHistories[currentIndex] && locationsHistories[currentIndex].key || createKey()));
  };

  var goBack = function goBack() {
    status = 0;
    go(-1);
  };

  var goForward = function goForward() {
    status = 1;
    go(1);
  };

  var createKey = function createKey() {
    var keyLen = typeof keyLength !== 'number' || keyLength > 6 ? 6 : keyLength;
    if (locationsHistories.length > 0 && locationsHistories[locationsHistories.length - 1].key) {
      return parseInt(locationsHistories[locationsHistories.length - 1].key) + 1;
    }
    return parseInt(Math.random().toString().substr(2, keyLen));
  };

  var createHref = function createHref(location) {
    return (0, _PathUtils.createPath)(location);
  };

  var createLocation = function createLocation(location, action) {
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : createKey();
    return (0, _LocationUtils.createLocation)(location, action, key);
  };

  var setStatus = function setStatus(_status) {
    status = _status;
  };

  var getStatus = function getStatus() {
    return status;
  };

  var getLocationKey = function getLocationKey() {
    return getCurrentLocation().key;
  };

  var getRoutingHistory = function getRoutingHistory() {
    return { locationsHistories: locationsHistories };
  };

  var insertRoutingHistoryBefore = function insertRoutingHistoryBefore(oldLocation, insertPath, replacePath) {
    var insertPathArray = insertPath && insertPath.split('?');
    var pathname = insertPathArray && insertPathArray[0];
    var search = insertPathArray ? '?' + insertPathArray[1] : '';
    if (oldLocation) {
      var currentIndex = -1;
      // the first time navigation to a page, oldLocation's key is null
      if (oldLocation.key === null) {
        currentIndex = 0;
      } else {
        locationsHistories.forEach(function (loc, idx) {
          if (currentIndex === -1 && loc.key === oldLocation.key) {
            currentIndex = idx;
          }
        });
      }

      if (currentIndex < 0) {
        throw Error('no such location in history');
      } else if (currentIndex === 0) {
        locationsHistories.unshift({ key: oldLocation.key - 1, pathname: pathname, search: search });
        (0, _DOMStateStorage.saveState)("locationsHistories", locationsHistories);
        window.history.replaceState({ key: oldLocation.key - 1 }, null, insertPath);
        window.history.pushState({ key: oldLocation.key }, null, replacePath);
      } else {
        for (var i = currentIndex - 1; i >= 0; i--) {
          locationsHistories[i].key--;
        }

        locationsHistories = [].concat(locationsHistories.slice(0, currentIndex), [{ key: oldLocation.key - 1, pathname: pathname, search: search }], locationsHistories.slice(currentIndex));
        (0, _DOMStateStorage.saveState)("locationsHistories", locationsHistories);
        window.history.replaceState({ key: oldLocation.key - 1 }, null, insertPath);
        window.history.pushState({ key: oldLocation.key }, null, replacePath);
      }
    }

    return {
      locationsHistories: locationsHistories
    };
  };

  return {
    getCurrentLocation: getCurrentLocation,
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: _PathUtils.createPath,
    createHref: createHref,
    createLocation: createLocation,

    setStatus: setStatus,
    getStatus: getStatus,
    getLocationKey: getLocationKey,
    getRoutingHistory: getRoutingHistory,
    insertRoutingHistoryBefore: insertRoutingHistoryBefore
  };
};

exports.default = createHistory;
//# sourceMappingURL=createHistory.js.map