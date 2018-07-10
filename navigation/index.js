/*
 * scheme url operation
 * author: Fuyu@lonefy
 * create time: 2018-05-24
 * 
 */
import Image from "../weibo-image";

export function scheme(url) {
    return "sinaweibo://browser?url=" + encodeURIComponent(url);
}

export function schemekk(url) {
    return "sinaweibo://kk?url=" + encodeURIComponent(url);
}

export function weiboShare(content, pics = []) {
    let picList = [].concat(pics).map(fid => {
        return {
            thumbnail: "https:" + Image(fid, "thumbnail"),
            original: "https:" + Image(fid, "large"),
            pid: fid
        };
    });
    window.location.href =
        "sinaweibo://sendweibo?content=" +
        encodeURIComponent(decodeURIComponent(content)) +
        (picList.length
            ? "&pics=" + encodeURIComponent(JSON.stringify(picList))
            : "");
}

export function navigationCloseAndOpen(url) {
    window.location.href =
        "sinaweibo://browser/close?scheme=" + encodeURIComponent(url);
}

export function historyBackAddUrl(addUrl, curUrl = window.location.href) {
    const { history } = window;
    if (history.pushState && history.length <= 1) {
        history.replaceState("curstate", null, curUrl);
        history.pushState({}, null, curUrl);
    }
    window.onpopstate = e => {
        if (e.state == "curstate") {
            window.location.replace(addUrl);
        }
    };
}
/*
 * 生成目标页地址
 * 用于保留当前页面url query
 * 
 * @params url[string] 目标页url
 * @params addition[object] 增加字段
 * @params reserve[string/array] 保留query
 * 
 * @return url[string]
 */
export function generateUrl(url = "", addition = {}, reserve = []) {
    var searchString = window.location.search,
        query = {},
        target = url.split("?"),
        reserve = [].concat(reserve)

    addQuery(searchString.substr(1, searchString.length))
    
    target[1] && addQuery(target[1], false)

    addition = Object.assign(addition, query) 

    return target[0] + "?" + Object.keys(addition).map(k => `${k}=${addition[k]}`).join("&");

    function addQuery(string, filter = true) {
        string.split("&").map(item => {
            var [key, value] = item.split("=");

            if(filter){
                if (reserve.indexOf(key) !== -1) {
                    query[key] = value;
                }
            }else{
                query[key] = value;
            }

        });
    }
}
