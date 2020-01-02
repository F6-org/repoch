"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWindow;
/**
 * 判断元素是否是window
 */

function isWindow(obj) {
  return obj != null && obj == obj.window;
};
//# sourceMappingURL=is-window.js.map