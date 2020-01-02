"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (node) {
  return node != undefined && Boolean(node.nodeName) && Boolean(node.nodeType);
};

; /**
   * is node
   * @id STK.core.dom.isNode
   * @alias STK.core.dom.isNode
   * @param {Element} node
   * @return {Boolean} true/false
   * @author Robin Young | yonglin@staff.sina.com.cn
   * @example
   * STK.core.dom.isNode($.E('test')) == true;
   */
//# sourceMappingURL=is-node.js.map