'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function () {
	var classes = '';

	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (!arg) continue;

		var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

		if (argType === 'string' || argType === 'number') {
			classes += ' ' + arg;
		} else if (Array.isArray(arg)) {
			classes += ' ' + arguments.callee.apply(null, arg);
		} else if (argType === 'object') {
			for (var key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes += ' ' + key;
				}
			}
		}
	}

	return classes.substr(1);
};

var hasOwn = {}.hasOwnProperty;
//# sourceMappingURL=classnames.js.map