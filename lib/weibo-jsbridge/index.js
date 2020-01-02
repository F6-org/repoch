'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkAvailability = require('./check-availability');

var _checkAvailability2 = _interopRequireDefault(_checkAvailability);

var _browserInfo = require('./browser-info');

var _browserInfo2 = _interopRequireDefault(_browserInfo);

var _getLocation = require('./get-location');

var _getLocation2 = _interopRequireDefault(_getLocation);

var _loginWeibo = require('./login-weibo');

var _loginWeibo2 = _interopRequireDefault(_loginWeibo);

var _noExsit = require('./no-exsit');

var _noExsit2 = _interopRequireDefault(_noExsit);

var _openImage = require('./open-image');

var _openImage2 = _interopRequireDefault(_openImage);

var _openMenu = require('./open-menu');

var _openMenu2 = _interopRequireDefault(_openMenu);

var _pickImage = require('./pick-image');

var _pickImage2 = _interopRequireDefault(_pickImage);

var _qrCode = require('./qr-code');

var _qrCode2 = _interopRequireDefault(_qrCode);

var _setBrowserTitle = require('./set-browser-title');

var _setBrowserTitle2 = _interopRequireDefault(_setBrowserTitle);

var _setMenuItems = require('./set-menu-items');

var _setMenuItems2 = _interopRequireDefault(_setMenuItems);

var _sharingContent = require('./sharing-content');

var _sharingContent2 = _interopRequireDefault(_sharingContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    checkAvailability: _checkAvailability2.default,
    getBrowserInfo: _browserInfo2.default,
    getLocation: _getLocation2.default,
    loginWeiboAccount: _loginWeibo2.default,
    noexsit: _noExsit2.default,
    openImage: _openImage2.default,
    openMenu: _openMenu2.default,
    pickImage: _pickImage2.default,
    scanQRCode: _qrCode2.default,
    setBrowserTitle: _setBrowserTitle2.default,
    setMenuItems: _setMenuItems2.default,
    setSharingContent: _sharingContent2.default
};
//# sourceMappingURL=index.js.map