"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCookie = setCookie;
exports.getCookie = getCookie;
/*
 * cookie operation 
 * author: Fuyu@lonefy
 * create time: 2018-05-23
 * 
 */

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";expires=Session";
}

function getCookie(str) {
    var tmp,
        reg = new RegExp("(^| )" + str + "=([^;]*)(;|$)", "gi");
    if (tmp = reg.exec(document.cookie)) return tmp[2];
    return null;
}
//# sourceMappingURL=index.js.map