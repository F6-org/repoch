/**
 * 判断深度比较两个变量
 * @name 
 * @function
 * @param {String|Number|Object|Array} a
 * @param {String|Number|Object|Array} b
 * @return {Boolean} 
 * @author MrGalaxyn
 */

export function arraysDiffer(a, b) {
    var isDifferent = false;
    if (a.length !== b.length) {
        isDifferent = true;
    } else {
        a.forEach(function(item, index) {
            if (!isSame(item, b[index])) {
                isDifferent = true;
            }
        });
    }
    return isDifferent;
}

var hasOwn = Object.prototype.hasOwnProperty;
export function shallowEqual(a, b) {
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

    return aKeys.every(function(key){
        return hasOwn.call(b, key) && a[key] === b[key];

    });
}

export function isSame(a, b) {
    if (typeof a !== typeof b) {
        return false;
    } else if (Array.isArray(a)) {
        return !arraysDiffer(a, b);
    } else if (typeof a === 'object' && a !== null && b !== null) {
        return shallowEqual(a, b);
    }

    return a === b;
}

