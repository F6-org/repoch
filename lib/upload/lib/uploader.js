'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (node, opts) {
    var that = {},
        _uploadBtn,
        _image,
        _canvas,
        _fileTypeList,
        _fileList,
        _opts = _extends({}, {
        width: 230,
        height: 140,
        maxFileNum: 1,
        maxFileSize: 5,
        fileFilter: 'img',
        isOriginal: true,
        imgMaxWidth: 512,
        imgMaxHeight: 200,
        upServer: '',
        fileExtensions: '',
        checkSize: false,
        withSize: false,
        watermark: "",
        getBase64: function getBase64() {},
        uploaded: function uploaded() {},
        uploading: function uploading() {},
        error: function error() {},
        readed: function readed() {},
        storageType: 2, // 1 = 图床，2 = 微盘
        callback: function callback() {},
        data: {}
    }, opts);

    var eventFun = {
        fileSelected: function fileSelected(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            init();
            _fileList = toArray(evt.target.files || []);
            var fileNum = _fileList.length;
            if (!fileNum) return;

            //判断文件数量是否合法；
            if (fileNum > _opts.maxFileNum) {
                var ret = {
                    msg: "最多选择" + _opts.maxFileNum + "个文件",
                    type: 'error',
                    code: 110002
                };
                _opts.error && _opts.error(ret);
                return;
            }
            for (var i = 0; i < fileNum; i++) {
                //判断是否有文件的大小不合法；
                if (_fileList[i].size > _opts.maxFileSize * FILE_SIZE_MB) {
                    var ret = {
                        msg: "文件大小超出" + _opts.maxFileSize + "M",
                        type: 'error',
                        code: 110003
                    };
                    _opts.error && _opts.error(ret);
                    return;
                }
                //判断文件类型是否合法；
                var type = utilFun.getFileExtType(_fileList[i].name).toLowerCase();
                if (_fileTypeList.indexOf(type) < 0) {
                    var ret = {
                        msg: "文件类型错误，仅支持上传" + _fileTypeList.join(',') + "类型文件",
                        type: 'error',
                        code: 110004
                    };
                    _opts.error && _opts.error(ret);
                    return;
                }
            }
            //通知文件处理模块，文件已经选择完
            fileReaderFun.handleFile(_fileList);
            // progressFun.uploading();
        }
    };

    var fileReaderFun = {
        handleFile: function handleFile() {
            if (_fileList.length == 0) return;

            var fileReader = new FileReader();
            fileReader.onload = fileReaderFun.onLoad;
            // fileReader.onprogress = fileReaderFun.onProgress;
            fileReader.onabort = fileReader.onAbort;
            fileReader.onerror = fileReaderFun.onError;
            fileReader.onloadstart = fileReaderFun.onLoadstart;
            fileReader.onloadend = fileReaderFun.onLoadend;
            var file = _fileList.shift();
            fileReader.filename = file.name;
            fileReader.readAsDataURL(file); //读取base64数据
        },
        onLoad: function onLoad(evt) {
            var _handleImage = false; //标记是否需要对图片做像素处理

            if (_opts.fileFilter === 'img' && (_opts.imgMaxWidth && _opts.imgMaxHeight || _opts.withSize || _opts.checkSize || _opts.watermark)) {
                _handleImage = true;
            }
            //如果是图片，且需要，则先裁剪再展示
            var _imageData = evt.target.result;
            var _imageName = evt.target.filename;

            if (_handleImage) {
                var type = utilFun.getFileExtType(_imageName);
                var src = 'data:' + MIME_EXT_MAPPING[type] + ';base64,' + _imageData.split(',')[1];
                if (!_image) _image = new Image();
                if (!_canvas) _canvas = document.createElement('canvas');

                _image.onload = function () {
                    var _handled = false;
                    //图片像素处理
                    if (_opts.checkSize && !imageHandler.checkSize()) {
                        return;
                    }
                    if (_opts.imgMaxWidth && _opts.imgMaxHeight) {
                        imageHandler.crop();
                        _handled = true;
                    }
                    if (_opts.watermark) {
                        imageHandler.addWatermark();
                        _handled = true;
                    }
                    _handled ? progressFun.readed(_canvas.toDataURL(), _imageName) : progressFun.readed(_imageData, _imageName);
                };
                _image.src = src;
            } else {
                progressFun.readed(_imageData, _imageName);
            }
        },
        // onProgress: function(evt) {
        // if (evt.lengthComputable) {
        //     var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        //     if (percentLoaded < 100) {
        //         progressFun.uploading(percentLoaded);
        //     }
        // }
        // },
        onAbort: function onAbort(evt) {},
        onError: function onError(evt) {},
        onLoadstart: function onLoadstart(evt) {},
        onLoadend: function onLoadend(evt) {}
    };

    var _hasDraw = false;
    var imageHandler = {
        crop: function crop() {
            if (!_canvas || !_image) return;
            var srcW = _image.width,
                srcH = _image.height,
                destW = _opts.imgMaxWidth,
                destH = _opts.imgMaxHeight,
                widthRatio = srcW / destW,
                heightRatio = srcH / destH,
                scale,
                //缩放比例，原图尺寸和目标尺寸的对比
            sx,
                //原图采集开始的x坐标
            sy,
                //原图采集开始的y坐标
            swidth,
                //原图采集区域的宽度
            sheight; //原图采集区域的高度

            _canvas.width = destW;
            _canvas.height = destH;

            //缩放后居中裁切
            //匹配宽高比率小的那个边；
            //如果宽度比大于高度比，说明要匹配高度，宽度裁切；反之亦然。
            if (widthRatio > heightRatio) {
                scale = heightRatio;
                swidth = destW * scale;
                sheight = destH * scale;
                //居中的起始位置x坐标。
                sx = Math.abs((swidth - srcW) / 2);
                sy = 0;
            } else {
                scale = widthRatio;
                swidth = destW * scale;
                sheight = destH * scale;
                //居中的起始位置y坐标。
                sx = 0;
                sy = Math.abs((sheight - srcH) / 2);
            }
            _canvas.getContext('2d').drawImage(_image, sx, sy, swidth, sheight, 0, 0, destW, destH);
            _hasDraw = true;
        },
        checkSize: function checkSize() {
            if (!_image) return;
            var srcW = _image.width,
                srcH = _image.height,
                destW = _opts.imgMaxWidth,
                destH = _opts.imgMaxHeight;

            if (srcW !== destW || srcH !== destH) {
                var ret = {
                    msg: "图片尺寸不符合规范",
                    type: 'error',
                    code: 110008
                };
                _opts.error && _opts.error(ret);
                return false;
            }
            if (!_hasDraw) {
                _canvas.width = _image.width;
                _canvas.height = _image.height;
                _canvas.getContext('2d').drawImage(_image, 0, 0);
            }
            return true;
        },
        addWatermark: function addWatermark() {
            if (!_canvas) return;
            if (!_image) return;
            if (!_hasDraw) {
                _canvas.width = _image.width;
                _canvas.height = _image.height;
                _canvas.getContext('2d').drawImage(_image, 0, 0);
            }

            var text = _opts.watermark;
            var ctx = _canvas.getContext('2d');
            ctx.save();
            var _alpha = 0.1; //字体透明度
            var _w = _canvas.width; //图片宽度
            var _h = _canvas.height; //图片高度
            var _delta = 0.85;
            var _d = _delta * Math.sqrt(_w * _w + _h * _h); //图片对角线长度(减去两端留白)
            var _fs = 500; //字体大小
            ctx.font = _fs + "px 宋体";
            ctx.fillStyle = 'rgba(0, 0, 0, ' + _alpha + ')';
            //动态调整字体大小；
            var _textWidth = ctx.measureText(text).width;
            while (_textWidth > _d) {
                _fs--;
                ctx.font = _fs + "px 宋体";
                _textWidth = ctx.measureText(text).width;
            }
            //设置旋转中心点和旋转方向（从左下至右上）
            var _rDelta = _w > _h ? _delta : 2 - _delta;
            _rDelta = _w === _h ? 1 : _rDelta;
            ctx.translate(_w / 2, _h / 2);
            ctx.rotate(-Math.atan(_h / _w) * _rDelta);

            ctx.fillText(text, -_textWidth / 2, _fs * 0.9 / 2);
            ctx.restore();
        }
    };

    var progressFun = {
        onProgress: function onProgress(evt) {
            var percentLoaded = Math.round(evt.loaded / evt.total * 100);
            progressFun.uploading(percentLoaded);
        },
        uploading: function uploading(progress) {
            var ret = {
                msg: "上传中",
                type: 'uploading',
                data: progress,
                code: 110005
            };
            _opts.uploading && _opts.uploading(ret);
        },
        uploaded: function uploaded(response) {
            if (_opts.withSize) {
                response.data.width = _image.width;
                response.data.height = _image.height;
            }
            _opts.uploaded && _opts.uploaded(response);
        },
        getBase64: function getBase64(imgBase64) {
            _opts.getBase64 && _opts.getBase64(imgBase64);
        },
        error: function error(data) {
            var ret = {
                msg: "网络繁忙，请重试！",
                type: 'error',
                data: data,
                code: 100006
            };
            _opts.error && _opts.error(ret);
        },
        readed: function readed(src, name) {
            var data = _extends({
                data: utilFun.encode(src),
                storageType: _opts.storageType,
                filename: name
            }, _opts.data);

            (0, _ajax.post)(_opts.upServer, data, { onUploadProgress: progressFun.onProgress }).then(function (response) {
                response.code = 100000;
                progressFun.uploaded(response);
                progressFun.getBase64(utilFun.encode(src));
                fileReaderFun.handleFile();
            }).catch(function (response) {
                progressFun.error(response);
                fileReaderFun.handleFile();
            });

            var ret = {
                msg: "文件已获取",
                type: 'readed',
                data: src,
                code: 100007
            };
            _opts.readed && _opts.readed(ret);
        }
    };

    var utilFun = {
        encode: function encode(str) {
            return str.replace(/\&/g, '&amp;').replace(/"/g, '&quot;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\'/g, '&#39;').replace(/\u00A0/g, '&nbsp;').replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, '&#32;');
        },
        getFileExtType: function getFileExtType(name) {
            var _tmp = name.split('.');
            var type = _tmp[_tmp.length - 1];
            // 小米2读不到图片正确名字
            if (_opts.fileFilter === 'img' && type === undefined) type = 'jpg';

            return type;
        }
    };

    var DOMFun = {
        setUploadBtnAttr: function setUploadBtnAttr() {
            var uploadBtn = (0, _querySelectorAll2.default)(node, 'input[data-type="uploadBtn"]')[0];
            if (!_fileTypeList) {
                if (_opts.fileExtensions) _fileTypeList = _opts.fileExtensions.split(',');else _fileTypeList = FILE_FILTER[_opts.fileFilter].split(',');

                var acceptList = [];
                for (var i = 0, len = _fileTypeList.length; i < len; i++) {
                    acceptList.push(MIME_EXT_MAPPING[_fileTypeList[i]]);
                }
                if (_opts.maxFileNum < 2) uploadBtn.removeAttribute("multiple");
                uploadBtn.setAttribute('accept', acceptList.join(','));
            }

            (0, _on2.default)(uploadBtn, 'change', eventFun.fileSelected);
        }
    };

    function init() {
        var uploadBtn = (0, _querySelectorAll2.default)(node, 'input[data-type="uploadBtn"]')[0];
        var uploaderContainer = uploadBtn.parentNode;
        var html = uploaderContainer.innerHTML;

        uploaderContainer.innerHTML = html;
        DOMFun.setUploadBtnAttr();
    }

    init();
    that.destroy = function () {
        _image = _canvas = _fileTypeList = null;
        eventFun = progressFun = utilFun = null;
        DOMFun = fileReaderFun = imageHandler = null;
    };

    return that;
};

var _querySelectorAll = require('dom-helpers/query/querySelectorAll');

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

var _ajax = require('../../ajax');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILE_SIZE_MB = 1024 * 1024;
var MIME_EXT_MAPPING = {
    //图像
    'gif': 'image/gif',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'tif': 'image/tiff',
    'tiff': 'image/tiff',
    'bmp': 'image/bmp',
    //文档
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'dot': 'application/msword',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'pps': 'application/vnd.ms-powerpoint',
    'pot': 'application/vnd.ms-powerpoint',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xlc': 'application/vnd.ms-excel',
    'xlm': 'application/vnd.ms-excel',
    'xlt': 'application/vnd.ms-excel',
    'pdf': 'application/pdf',
    'mpp': 'application/vnd.ms-project',
    'txt': 'text/plain',
    'text': 'text/plain',
    'wps': 'application/vnd.ms-works',
    'wdb': 'application/vnd.ms-works',
    'rtf': 'application/rtf,text/rtf',
    'htm': 'text/html',
    'html': 'text/html',
    'xhtml': 'application/xhtml+xml',
    'xml': 'application/xml,text/xml',
    'js': 'text/javascript,application/javascript',
    'json': 'application/json',
    'css': 'text/css',
    'csv': 'text/csv',
    'zip': 'aplication/zip',
    'dtd': 'application/xml-dtd',
    'asf': 'application/vnd.ms-asf',
    //音频
    '3gpp': 'audio/3gpp,video/3gpp',
    'ac3': 'audio/ac3',
    'ogg': 'application/ogg,audio/ogg',
    'mp3': 'audio/mpeg',
    'mp2': 'audio/mpeg,video/mpeg',
    'mp4': 'audio/mp4,video/mp4',
    'au': 'audio/basic',
    //视频
    'mpeg': 'video/mpeg',
    'mpg': 'video/mpeg'
};
var FILE_FILTER = {
    img: "jpg,png,gif,jpeg,bmp",
    doc: "doc,docx,xls,xlsx,ppt,pptx,pdf,txt",
    all: "jpg,png,gif,jpeg,bmp,doc,docx,xls,xlsx,ppt,pptx,pdf,txt"
};

var toArray = function toArray(pseudoArrayObj) {
    try {
        return slice.call(pseudoArrayObj);
    } catch (e) {
        var arr = [];
        for (var i = 0, l = pseudoArrayObj.length; i < l; i++) {
            arr[i] = pseudoArrayObj[i];
        }
        return arr;
    }
};

;
//# sourceMappingURL=uploader.js.map