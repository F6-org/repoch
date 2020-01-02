'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pageSize;

var _winSize = require('./win-size');

var _winSize2 = _interopRequireDefault(_winSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pageSize(_target) {
    var target;
    if (_target) {
        target = _target.document;
    } else {
        target = document;
    }
    var _rootEl = target.compatMode == "CSS1Compat" ? target.documentElement : target.body;
    var xScroll, yScroll;
    var pageHeight, pageWidth;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = _rootEl.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (_rootEl.scrollHeight > _rootEl.offsetHeight) {
        xScroll = _rootEl.scrollWidth;
        yScroll = _rootEl.scrollHeight;
    } else {
        xScroll = _rootEl.offsetWidth;
        yScroll = _rootEl.offsetHeight;
    }
    var win_s = (0, _winSize2.default)(_target);
    if (yScroll < win_s.height) {
        pageHeight = win_s.height;
    } else {
        pageHeight = yScroll;
    }
    if (xScroll < win_s.width) {
        pageWidth = win_s.width;
    } else {
        pageWidth = xScroll;
    }
    return {
        'page': {
            width: pageWidth,
            height: pageHeight
        },
        'win': {
            width: win_s.width,
            height: win_s.height
        }
    };
} /**
   * Get page size
   * @return {Object} 
      {
          'page':{
              width: {Number},
              height: {Number}
          },
          'win':{
              width: {Number},
              height: {Number}
          }
      };
   */
;
//# sourceMappingURL=page-size.js.map