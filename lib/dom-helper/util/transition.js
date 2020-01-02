'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listenTransition = listenTransition;
exports.listenAnimationIteration = listenAnimationIteration;
exports.listenAnimationEnd = listenAnimationEnd;
/**
 * 监听transitionEnd
 * 
 * @author MrGalaxyn@staff.sina.com.cn
 */
var dummyStyle = process.env.BROWSER ? document.createElement('div').style : {};
var vendor = function () {
    var vendors = 't,webkitT,MozT,msT,OT'.split(','),
        t = void 0,
        i = 0,
        l = vendors.length;

    for (; i < l; i++) {
        t = vendors[i] + 'ransform';
        if (t in dummyStyle) {
            return vendors[i].substr(0, vendors[i].length - 1);
        }
    }

    return false;
}();

var prefixStyle = function prefixStyle(style) {
    if (vendor === '') return style;
    style = style.charAt(0).toUpperCase() + style.substr(1);
    return vendor + style;
};

var transitionEndEvent = function () {
    if (vendor == 'webkit' || vendor === 'O') {
        return vendor.toLowerCase() + 'TransitionEnd';
    }
    return 'transitionend';
}();

var transition = exports.transition = prefixStyle('transition');

function listenTransition(target, duration, callbackFn) {
    var me = this,
        clear = function clear() {
        if (target.transitionTimer) clearTimeout(target.transitionTimer);
        target.transitionTimer = null;
        target.removeEventListener(transitionEndEvent, handler, false);
    },
        handler = function handler() {
        clear();
        if (callbackFn) callbackFn.call(me);
    };
    clear();
    target.addEventListener(transitionEndEvent, handler, false);
    target.transitionTimer = setTimeout(handler, duration + 100);
};

function listenAnimationIteration(target, duration, callbackFn) {
    var me = this,
        transitionTimer,

    // event = transitionEndEvent === 'transitionend' ? 'animationiteration' :
    //     transitionEndEvent.replace('TransitionEnd', 'AnimationIteration'),
    clear = function clear() {
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = null;
        // target.removeEventListener(event, handler, false);
        target.removeEventListener('animationiteration', handler, false);
        target.removeEventListener('webkitAnimationIteration', handler, false);
    },
        handler = function handler() {
        clear();
        if (callbackFn) callbackFn.call(me);
    };
    clear();
    target.addEventListener('animationiteration', handler, false);
    target.addEventListener('webkitAnimationIteration', handler, false);
    // target.addEventListener(event, handler, false);
    transitionTimer = setTimeout(handler, duration + 100);
};

function listenAnimationEnd(target, duration, callbackFn) {
    var me = this,
        transitionTimer,

    // event = transitionEndEvent === 'transitionend' ? 'animationend' :
    //     transitionEndEvent.replace('TransitionEnd', 'AnimationEnd'),
    clear = function clear() {
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = null;
        // target.removeEventListener(event, handler, false);
        target.removeEventListener('animationend', handler, false);
        target.removeEventListener('webkitAnimationEnd', handler, false);
    },
        handler = function handler() {
        clear();
        if (callbackFn) callbackFn.call(me);
    };
    clear();
    target.addEventListener('animationend', handler, false);
    target.addEventListener('webkitAnimationEnd', handler, false);
    transitionTimer = setTimeout(handler, duration + 100);
};
//# sourceMappingURL=transition.js.map