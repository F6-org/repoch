'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = decodeHTML;
function decodeHTML(str) {
    if (typeof str !== 'string') {
        throw 'decodeHTML need a string as parameter';
    }
    return str.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, '\'').replace(/&nbsp;/g, '\xA0').replace(/&#32;/g, ' ').replace(/&amp;/g, '\&');
}
//# sourceMappingURL=decodeHTML.js.map