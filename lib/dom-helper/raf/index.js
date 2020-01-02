'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var raf = void 0,
    cancelRaf = void 0;
if (process.env.BROWSER) {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var af = 'AnimationFrame';
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        var vendor = vendors[x];
        raf = window[vendor + 'Request' + af];
        cancelRaf = window[vendor + 'Cancel' + af] || window[vendor + 'CancelRequest' + af];
    }
}

if (!raf) {
    var lastTime = 0;
    raf = function raf(callback) {
        var currTime = Date.now ? Date.now() : new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            return callback(currTime + timeToCall);
        }, timeToCall);

        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!cancelRaf) {
    cancelRaf = function cancelRaf(id) {
        return clearTimeout(id);
    };
}

var RAF = exports.RAF = raf;
var cancelRAF = exports.cancelRAF = cancelRaf;
//# sourceMappingURL=index.js.map