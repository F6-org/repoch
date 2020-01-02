import { loopAsync } from './AsyncUtils'
import { createPath } from './PathUtils'
import runTransitionHook from './runTransitionHook'
import { PUSH, REPLACE, POP } from './Actions'
import { readState, saveState } from './DOMStateStorage'
import {
  createLocation as _createLocation,
  statesAreEqual,
  locationsAreEqual
} from './LocationUtils'

const createHistory = (options = {}) => {
  const {
    getCurrentLocation,
    getUserConfirmation,
    pushLocation,
    replaceLocation,
    go,
    keyLength
  } = options

  let currentLocation
  let pendingLocation
  let beforeListeners = []
  let listeners = []
  let locationsHistories = readState("locationsHistories") || []
  let status

  const getCurrentIndex = () => {
    let index = -1;
    if (pendingLocation && pendingLocation.action === POP) {
      locationsHistories.forEach(function(loc, idx) {
        if (index === -1 && loc.key === pendingLocation.key) {
          index = idx;
        }
      })
    }      

    if (currentLocation) {
      locationsHistories.forEach(function(loc, idx) {
        if (index === -1 && loc.key === currentLocation.key) {
          index = idx;
        }
      })
    }

    return index
  }

  const updateLocation = (nextLocation) => {
    let currentIndex = getCurrentIndex()
    currentLocation = nextLocation
    if (currentLocation.action === PUSH) {
      locationsHistories = [].concat(locationsHistories.slice(0, currentIndex + 1), [currentLocation])
      saveState("locationsHistories", locationsHistories);
    } else if (currentLocation.action === REPLACE) {
      if (currentIndex < 0 && locationsHistories.length === 0) {
        currentIndex = 0;
      }
      locationsHistories[currentIndex] = currentLocation;
      saveState("locationsHistories", locationsHistories);
    }

    listeners.forEach(listener => listener(currentLocation))
  }

  const listenBefore = (listener) => {
    beforeListeners.push(listener)

    return () =>
      beforeListeners = beforeListeners.filter(item => item !== listener)
  }

  const listen = (listener) => {
    listeners.push(listener)

    currentLocation = getCurrentLocation();
    // if a new navigation, reset history
    if (currentLocation.key === null) {
      currentLocation = createLocation(getCurrentLocation(), POP, createKey());
      replaceLocation(currentLocation)
      locationsHistories = [currentLocation]
      saveState("locationsHistories", locationsHistories)
    }

    return () =>
      listeners = listeners.filter(item => item !== listener)
  }

  const confirmTransitionTo = (location, callback) => {
    loopAsync(
      beforeListeners.length,
      (index, next, done) => {
        runTransitionHook(beforeListeners[index], location, (result) =>
          result != null ? done(result) : next()
        )
      },
      (message) => {
        if (getUserConfirmation && typeof message === 'string') {
          getUserConfirmation(message, (ok) => callback(ok !== false))
        } else {
          callback(message !== false)
        }
      }
    )
  }

  const transitionTo = (nextLocation) => {
    if (
      (currentLocation && locationsAreEqual(currentLocation, nextLocation)) ||
      (pendingLocation && locationsAreEqual(pendingLocation, nextLocation))
    )
      return // Nothing to do

    pendingLocation = nextLocation

    confirmTransitionTo(nextLocation, (ok) => {
      if (pendingLocation !== nextLocation)
        return // Transition was interrupted during confirmation

      status = currentLocation && currentLocation.key > nextLocation.key ? 0 : 1

      pendingLocation = null

      if (ok) {
        // Treat PUSH to same path like REPLACE to be consistent with browsers
        if (nextLocation.action === PUSH) {
          const prevPath = createPath(currentLocation)
          const nextPath = createPath(nextLocation)

          if (nextPath === prevPath && statesAreEqual(currentLocation.state, nextLocation.state))
            nextLocation.action = REPLACE
        }

        if (nextLocation.action === POP) {
          updateLocation(nextLocation)
        } else if (nextLocation.action === PUSH) {
          if (pushLocation(nextLocation) !== false)
            updateLocation(nextLocation)
        } else if (nextLocation.action === REPLACE) {
          if (replaceLocation(nextLocation) !== false)
            updateLocation(nextLocation)
        }
      } else if (currentLocation && nextLocation.action === POP) {
        let prevIndex = -1;
        let nextIndex = -1;
        locationsHistories.forEach(function(loc, idx) {
          if (prevIndex === -1 && loc.key === currentLocation.key) {
            prevIndex = idx;
          }
          if (nextIndex === -1 && loc.key === nextLocation.key) {
            nextIndex = idx;
          }
        });
        if (prevIndex !== -1 && nextIndex !== -1)
          go(prevIndex - nextIndex) // Restore the URL
      }
    })
  }

  const push = (input) =>
    transitionTo(createLocation(input, PUSH))

  const replace = (input) => {
    const currentIndex = getCurrentIndex()
    transitionTo(createLocation(input, REPLACE, (locationsHistories[currentIndex] && locationsHistories[currentIndex].key) || createKey()))
  }

  const goBack = () => {
    status = 0
    go(-1)
  }

  const goForward = () => {
    status = 1
    go(1)
  }

  const createKey = () => {
    let keyLen = (typeof keyLength !== 'number' || keyLength > 6) ? 6 : keyLength;
    if (locationsHistories.length > 0 && locationsHistories[locationsHistories.length - 1].key) {
      return parseInt(locationsHistories[locationsHistories.length - 1].key) + 1;
    }
    return parseInt(Math.random().toString().substr(2, keyLen));
  }

  const createHref = (location) =>
    createPath(location)

  const createLocation = (location, action, key = createKey()) =>
    _createLocation(location, action, key)

  const setStatus = (_status) => {
    status = _status
  }

  const getStatus = () =>
    status

  const getLocationKey = () =>
    getCurrentLocation().key
  
  const getRoutingHistory = () => {
    return { locationsHistories: locationsHistories }
  }

  const insertRoutingHistoryBefore = (oldLocation, insertPath, replacePath) => {
    let insertPathArray = insertPath && insertPath.split('?');
    let pathname = insertPathArray && insertPathArray[0];
    let search = insertPathArray ? '?' + insertPathArray[1] : '';
    if (oldLocation) {
      let currentIndex = -1;
      // the first time navigation to a page, oldLocation's key is null
      if (oldLocation.key === null) {
        currentIndex = 0;
      } else {
        locationsHistories.forEach(function(loc, idx) {
          if (currentIndex === -1 && loc.key === oldLocation.key) {
            currentIndex = idx;
          }
        });
      }
        
      if (currentIndex < 0) {
        throw Error('no such location in history');
      } else if (currentIndex === 0) {
        locationsHistories.unshift({ key: oldLocation.key - 1, pathname, search });
        saveState("locationsHistories", locationsHistories);
        window.history.replaceState({ key: oldLocation.key - 1 }, null, insertPath);
        window.history.pushState({ key: oldLocation.key }, null, replacePath);
      } else {
        for (let i = currentIndex - 1; i >= 0; i--) {
          locationsHistories[i].key--;
        }

        locationsHistories = [].concat(
          locationsHistories.slice(0, currentIndex), 
          [{ key: oldLocation.key - 1, pathname, search }],
          locationsHistories.slice(currentIndex)
        );
        saveState("locationsHistories", locationsHistories);
        window.history.replaceState({ key: oldLocation.key - 1 }, null, insertPath);
        window.history.pushState({ key: oldLocation.key }, null, replacePath);
      }
    }

    return {
      locationsHistories: locationsHistories
    }
  }

  return {
    getCurrentLocation,
    listenBefore,
    listen,
    transitionTo,
    push,
    replace,
    go,
    goBack,
    goForward,
    createKey,
    createPath,
    createHref,
    createLocation,

    setStatus,
    getStatus,
    getLocationKey,
    getRoutingHistory,
    insertRoutingHistoryBefore
  }
}

export default createHistory
