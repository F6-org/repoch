'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * bee - page data collection
                                                                                                                                                                                                                                                                   * @author MrGalaxyn
                                                                                                                                                                                                                                                                   */


exports.send = send;
exports.pv = pv;
exports.initLogger = initLogger;
exports.setpid = setpid;
exports.getpid = getpid;
exports.gettid = gettid;

var _networkType = require('../weibo-jsbridge/network-type');

var _networkType2 = _interopRequireDefault(_networkType);

var _isWeibo = require('../ua-detector/is-weibo');

var _isWeibo2 = _interopRequireDefault(_isWeibo);

var _createBackgroudTasks = require('../create-backgroud-tasks');

var _createBackgroudTasks2 = _interopRequireDefault(_createBackgroudTasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lid = void 0,
    pid = void 0,
    tid = void 0;
var errSended = false;
var firstScreen = false;
var startVisitTime = 0;
var stayTime = 0;

function send(stat) {
    if (!window['__logger__']) {
        return;
    }

    if ($CONFIG['uid']) {
        stat.uid = $CONFIG['uid'];
    }

    if (!(0, _isWeibo2.default)()) {
        window['__logger__'](stat);
    } else {
        (0, _networkType2.default)({
            onSuccess: function onSuccess(res) {
                stat.network = res;
                window['__logger__'](stat);
            },
            onFail: function onFail(code) {
                if (code !== 100) {
                    window['__logger__'](stat);
                }
            }
        });
    }
}

function pv(extra) {
    (0, _createBackgroudTasks2.default)(function () {
        var stat = _extends({
            pv: 1,
            pid: getpid(),
            i_s_pd: pid,
            sr: $CONFIG["serverRender"] ? 1 : 0,
            cache: $CONFIG['fromCache'] ? 1 : 0,
            network: false
        }, extra);

        if (!firstScreen) {
            firstScreen = true;
            stat.first = 1;
        }

        if (pid > 1) {
            stat.i_s_vt = stayTime;
        }

        send(stat);
    });
}

function initLogger() {
    lid = String(Date.now()).substr(5) + String(Math.random()).substr(2, 4);
    pid = 0;
    var oldOnError = window.onerror;

    window.onerror = function (message, file, line, column, error) {
        oldOnError && oldOnError.apply(this, arguments);
        if (errSended) {
            return;
        }
        errSended = true;
        var stat = { err: 1, pid: getpid() };
        send(stat);
    };
}

function setpid() {
    errSended = false;
    pid++;
    tid = 0;
    var now = Date.now();
    if (pid > 1) {
        stayTime = now - startVisitTime;
    }
    startVisitTime = now;
}

function getpid() {
    return lid + String(100 + pid % 100).substr(1);
}

function gettid() {
    return getpid() + String(1000 + tid++ % 1000).substr(1);
}
//# sourceMappingURL=index.js.map