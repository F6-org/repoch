'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fromWeibo;
function fromWeibo() {
    return process.env.BROWSER ? /_weibo_/ig.test(window.navigator.userAgent) : false;
};
//# sourceMappingURL=is-weibo.js.map