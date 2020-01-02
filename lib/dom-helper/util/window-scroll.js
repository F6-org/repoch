"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.windowScrollX = windowScrollX;
exports.windowScrollY = windowScrollY;
function windowScrollX() {
    return window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}

function windowScrollY() {
    return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}
//# sourceMappingURL=window-scroll.js.map