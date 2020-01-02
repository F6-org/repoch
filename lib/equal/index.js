'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.arraysDiffer = arraysDiffer;
exports.shallowEqual = shallowEqual;
exports.deepEqual = deepEqual;
exports.isSame = isSame;
/**
 * 判断深度比较两个变量
 * @name 
 * @function
 * @param {String|Number|Object|Array} a
 * @param {String|Number|Object|Array} b
 * @return {Boolean} 
 * @author MrGalaxyn
 */

function arraysDiffer(a, b) {
    var isDifferent = false;
    if (a.length !== b.length) {
        isDifferent = true;
    } else {
        a.forEach(function (item, index) {
            if (!isSame(item, b[index])) {
                isDifferent = true;
            }
        });
    }
    return isDifferent;
}

var hasOwn = Object.prototype.hasOwnProperty;
function shallowEqual(a, b) {
    // primitives (usually undefined)
    if (a === b) {
        return true;
    }

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    // prevents us from having to look at each key in b
    if (aKeys.length !== bKeys.length) {
        return false;
    }

    return aKeys.every(function (key) {
        return hasOwn.call(b, key) && a[key] === b[key];
    });
}

function deepEqual(x, y) {
    return x && y && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && (typeof y === 'undefined' ? 'undefined' : _typeof(y)) === 'object' ? Object.keys(x).length === Object.keys(y).length && Object.keys(x).reduce(function (isEqual, key) {
        return isEqual && deepEqual(x[key], y[key]);
    }, true) : x === y;
}

function isSame(a, b) {
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
        return false;
    } else if (Array.isArray(a)) {
        return !arraysDiffer(a, b);
    } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null && b !== null) {
        return shallowEqual(a, b);
    }

    return a === b;
}
//# sourceMappingURL=index.js.map