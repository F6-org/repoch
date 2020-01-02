'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = isPromise;
function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}
//# sourceMappingURL=PromiseUtils.js.map