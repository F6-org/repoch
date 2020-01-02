/*
 * cookie operation 
 * author: Fuyu@lonefy
 * create time: 2018-05-23
 * 
 */

export function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";expires=Session";
}

export function getCookie(str) {
    var tmp, reg = new RegExp("(^| )" + str + "=([^;]*)(;|$)", "gi");
    if ((tmp = reg.exec(document.cookie))) return tmp[2];
    return null;
}
