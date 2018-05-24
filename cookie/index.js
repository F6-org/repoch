/*
 * cookie operation 
 * author: Fuyu@lonefy
 * create time: 2018-05-23
 * 
 */

export default {
    setCookie,
    getCookie
};

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";expires=Session";
}

function getCookie(str) {
    var tmp, reg = new RegExp("(^| )" + str + "=([^;]*)(;|$)", "gi");
    if ((tmp = reg.exec(document.cookie))) return tmp[2];
    return null;
}
