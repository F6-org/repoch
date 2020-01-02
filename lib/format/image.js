'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isValidPicID = isValidPicID;
exports.default = getImgURL;
exports.getImageFormat = getImageFormat;
exports.getImgGeometry = getImgGeometry;
exports.getImgLargeFileSize = getImgLargeFileSize;

var _crc = require('../encrypt/crc32');

var _crc2 = _interopRequireDefault(_crc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidPicID(pid) {
    pid = String(pid);
    len = pid.length;

    var pat = /^[0-9a-zA-Z]{21,40}$/;
    return pat.test(pid);
}

function getImgURL(pid, type) {
    if (!pid) return '';

    var url;
    if (typeof type == "undefined") type = 'large';
    if (pid[9] == 'w' || pid[9] == 'y' && pid.length >= 32) {
        var zone = ((0, _crc2.default)(pid) & 3) + 1;
        var ext = pid[21] == 'g' ? 'gif' : 'jpg';
        url = pid[9] == 'w' ? '//ww' + zone + '.sinaimg.cn/' + type + '/' + pid + '.' + ext : '//wx' + zone + '.sinaimg.cn/' + type + '/' + pid + '.' + ext;
    } else {
        var zone = (parseInt(pid.substr(-2, 2), 16) & 0xf) + 1;
        url = '//ss' + zone + '.sinaimg.cn/' + type + '/' + pid + '&690';
    }

    return url;
}

function getImageFormat(pid) {
    var ext = pid[21] == 'g' ? 'gif' : 'jpg';
    return ext;
}

function getImgGeometry(pid) {
    pid = String(pid);
    var geo;

    if (pid.length >= 32 && pid[22] >= '1') {
        geo = new Object();
        geo.width = parseInt(pid.substr(23, 3), 36);
        geo.height = parseInt(pid.substr(26, 3), 36);
    }

    return geo;
}

function getImgLargeFileSize(pid) {
    var size = 0;
    pid = String(pid);

    if (pid.length >= 32 && pid[22] >= '2') {
        dn = parseInt(pid.substr(29, 3), 36);
        base = dn & 0x3FF;
        exp = dn >>> 10 & 0x3;
        rem = dn >>> 12 & 0xf;

        size = base << exp * 10;
        size += rem * 93 << (exp > 0 ? exp - 1 : exp) * 10;
    }
    return size;
}
//# sourceMappingURL=image.js.map