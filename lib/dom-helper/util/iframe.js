'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setInnerIframe = setInnerIframe;

require('./iconnect');

var _isNode = require('../dom/is-node');

var _isNode2 = _interopRequireDefault(_isNode);

var _getSize = require('../dom/get-size');

var _getSize2 = _interopRequireDefault(_getSize);

var _position = require('../dom/position');

var _position2 = _interopRequireDefault(_position);

var _pageSize = require('./page-size');

var _pageSize2 = _interopRequireDefault(_pageSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//变量定义区
var iframeConnect = {};
var FrameInner = {};
var tmpDiv = null;
var timer, timerSet;
var bodyWidth;
var bodyHeight;
var _radom = 'T' + new Date().getTime();
var _this = {
    autoHlayer: [],
    // reDefineScrollto : function(){
    //     $.core.util.scrollTo = function(el,opts){
    //         var _top = (opts && opts.top)?opts.top:0;
    //         var elTop = $.core.dom.position(el).t;
    //         _top = (elTop || 0) - _top;
    //         var _moveStop = (opts && opts.onMoveStop) || $.core.func.empty();
    //         iframeConnect.trigger &&iframeConnect.trigger('scrollTo', _top, _moveStop);
    //     };
    // },
    login: function login() {
        iframeConnect.trigger('uiLogin');
    },
    scroll: function scroll(scrollFn) {
        iframeConnect.on('scroll', scrollFn);
    },
    getOuterInfo: function getOuterInfo() {
        iframeConnect.getLayoutInfo(function (info) {
            FrameInner.outInfo = info;
        });
        return true;
    },
    setIframeHeight: function setIframeHeight(size) {
        iframeConnect.setHeight(size);
    },
    setDiaAutoHeight: function setDiaAutoHeight() {
        FrameInner.diaAutoHeight = function (el) {
            _this.autoHlayer.push(el);
            //at 绑定了 document.body 添加延时
            setTimeout(function () {
                var _pageH;
                if ((0, _isNode2.default)(el)) {
                    _pageH = (0, _position2.default)(el).t + (0, _getSize2.default)(el).height;
                } else {
                    //chrome时 util.pageSize().page.hegith 不包含在iframe中
                    _pageH = (0, _pageSize2.default)().page.height;
                }
                var _addH = _pageH - (0, _getSize2.default)(document.body).height;
                if (_addH > 0) {
                    if (!FrameInner.addAutoDiv) {
                        FrameInner.addAutoDiv = document.createElement('div');
                        document.body.appendChild(FrameInner.addAutoDiv);
                    }
                    var _div = FrameInner.addAutoDiv;
                    var _divHeight = (0, _getSize2.default)(_div).height;
                    var _h = _div && _div.style.display != 'none' ? _divHeight : 0;
                    _div.style.display = '';
                    _div.style.height = _addH + _h + 'px';
                }
            }, 100);
        };
    },
    hidediaAutoHeight: function hidediaAutoHeight() {
        FrameInner.diaAutoHide = function () {
            /*var isShowing = false;
            console.log(_this.autoHlayer);
            $.foreach(_this.autoHlayer,function(o,i){
                if(o && (o.style.display != 'none')){
                    isShowing = true;
                }else{
                    _this.autoHlayer.splice(i,1);
                }
            });
            console.log(11, isShowing);
            if(isShowing){return;}*/
            FrameInner.addAutoDiv && (FrameInner.addAutoDiv.style.display = 'none');
        };
    },
    //获取iframe尺寸
    getIframeSize: function getIframeSize() {
        var _size = (0, _pageSize2.default)().page;
        var width = _size.width;
        var height = _size.height;
        var _tmpTop;
        if (tmpDiv) {
            var childNodes = document.body.childNodes;
            if (childNodes[childNodes.length - 1] !== tmpDiv) {
                document.body.appendChild(tmpDiv);
            }
            var rect = tmpDiv.getBoundingClientRect();
            _tmpTop = parseInt(rect.top + 10);
            if (_tmpTop !== parseInt(tmpDiv.getAttribute("_top"))) {
                height = _tmpTop;
                // console.log(height, _tmpTop, width == bodyWidth && height == bodyHeight);
                tmpDiv.setAttribute("_top", height);
            }
        }
        if (width == bodyWidth && height == bodyHeight) {
            return height;
        }
        bodyWidth = width;
        bodyHeight = height;
        if (!tmpDiv) {
            tmpDiv = document.createElement("div");
            tmpDiv.id = "ifr_footer";
            tmpDiv.style.visibility = "hidden";
            tmpDiv.style.height = "0px";
            document.body.appendChild(tmpDiv);
            _tmpTop = tmpDiv.getBoundingClientRect().top + 10;
            tmpDiv.setAttribute("_top", _tmpTop);
            bodyHeight = _tmpTop;
        }
        return bodyHeight;
    }
};
function setInnerIframe() {
    iframeConnect = window.iframeConnect();
    iframeConnect.login = _this.login;
    iframeConnect.scroll = _this.scroll;
    //设置iframe高度
    var iframeSize;
    clearInterval(timerSet);
    timerSet = setInterval(function () {
        iframeSize = _this.getIframeSize();
        _this.setIframeHeight(iframeSize);
    }, 500);
    //抛出自动调整高度方法
    _this.setDiaAutoHeight();
    _this.hidediaAutoHeight();
    //重新定义scrollto方法
    // _this.reDefineScrollto();
    //$.core.util.scrollTo(document.body, {top:200});
    //设置为全局
    window.FrameInner = FrameInner;
    //获取外层全局信息
    clearInterval(timer);
    timer = setInterval(_this.getOuterInfo, 500);
};
//# sourceMappingURL=iframe.js.map