/*
 * scheme url operation
 * author: Fuyu@lonefy
 * create time: 2018-05-24
 * 
 */ 
export default {
    scheme,
    schemekk,
    navigationCloseAndOpen
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
