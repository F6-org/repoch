'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createBackgroundTask;

var _index = require('../dom-helper/ric/index');

var _index2 = _interopRequireDefault(_index);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tasks = [];
var isRequestIdleCallbackScheduled = false;

function schedulePendingEvents() {
    // Only schedule the rIC if one has not already been set.
    if (isRequestIdleCallbackScheduled) return;

    isRequestIdleCallbackScheduled = true;
    (0, _index2.default)(processPendingAnalyticsEvents);
}

function processPendingAnalyticsEvents(deadline) {
    // Go for as long as there is time remaining and work to do.
    while (deadline.timeRemaining() > 0 && tasks.length > 0) {
        var task = tasks.pop();
        task();
    }

    // Reset the boolean so future rICs can be set.
    isRequestIdleCallbackScheduled = false;

    // Check if there are more events still to send.
    if (tasks.length > 0) schedulePendingEvents();
}

function createBackgroundTask(task) {
    if (typeof task !== 'function') {
        (0, _warning2.default)(false, '[createBackgroundTask] must has a function as argument');
        return;
    }

    tasks.push(task);
    schedulePendingEvents();
}
//# sourceMappingURL=index.js.map