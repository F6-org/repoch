/*
 * scheme url operation
 * author: Fuyu@lonefy
 * create time: 2018-05-24
 * 
 */
export default {
    scheme,
    schemekk,
    navigationCloseAndOpen,
    historyBackAddUrl,
};


function scheme(url){
    return 'sinaweibo://browser?url=' + encodeURIComponent(url)
}

function schemekk(url){
    return 'sinaweibo://kk?url=' + encodeURIComponent(url);
}

function navigationCloseAndOpen(url){
    window.location.href = 'sinaweibo://browser/close?scheme=' + encodeURIComponent(url);
}

function historyBackAddUrl(curUrl = window.location.href, addUrl){
    const { history } = window;
    if (history.pushState && history.length <= 1) {
        history.replaceState("curstate", null, curUrl);
        history.pushState({}, null, curUrl);
    }
    window.onpopstate = (e) => {
        if (e.state == "curstate") {
            window.location.replace(addUrl);
        }
    }
}
