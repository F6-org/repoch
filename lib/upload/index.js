'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

var _querySelectorAll = require('dom-helpers/query/querySelectorAll');

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

var _pickImage = require('../weibo-jsbridge/pick-image');

var _pickImage2 = _interopRequireDefault(_pickImage);

var _uploader = require('./lib/uploader');

var _uploader2 = _interopRequireDefault(_uploader);

var _ajax = require('../ajax');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}
var PICK_CODE = {
    403: '非法调用',
    500: '客户端内部错误',
    501: '客户端未实现此动作',
    550: '客户端没有获取到结果',
    553: '相关服务未启用'
};

var Upload = function (_React$Component) {
    _inherits(Upload, _React$Component);

    function Upload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Upload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Upload.__proto__ || Object.getPrototypeOf(Upload)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
            var container = _this.refs.wrap;
            var that = _this;

            if (_this.props.useJsBridge) {
                var targetNode = (0, _querySelectorAll2.default)(container, '[data-type="uploadBtn"]');
                targetNode = targetNode.length === 0 ? container : targetNode[0];

                (0, _on2.default)(targetNode, 'click', function (e) {
                    (0, _pickImage2.default)({
                        camera: true,
                        onSuccess: function onSuccess(pic_base64) {
                            var ret = {
                                msg: "文件已获取",
                                type: 'readed',
                                data: pic_base64,
                                code: 100006
                            };
                            that.props.onReaded(ret);

                            that.uploadPicAj(pic_base64, 'jsbridge');
                        },
                        onFail: function onFail(code) {
                            var ret = {
                                msg: PICK_CODE[code],
                                type: 'error',
                                data: null,
                                code: 100010
                            };
                            that.props.onFail(ret);
                        }
                    });
                });
            } else {
                (0, _uploader2.default)(container, {
                    upServer: _this.props.upServer,
                    data: _this.props.data,
                    checkSize: _this.props.checkSize,
                    withSize: _this.props.withSize,
                    watermark: _this.props.watermark,
                    maxFileSize: _this.props.maxFileSize,
                    maxFileNum: _this.props.maxFileNum,
                    imgMaxWidth: _this.props.imgMaxWidth,
                    imgMaxHeight: _this.props.imgMaxHeight,
                    storageType: _this.props.storageType,
                    fileFilter: _this.props.fileType,
                    fileExtensions: _this.props.fileExtensions,
                    uploaded: function uploaded(ret) {
                        if (ret.code === 100000) {
                            that.props.onSuccess(ret);
                        } else {
                            that.props.onFail(ret);
                        }
                    },
                    getBase64: function getBase64(ret) {
                        that.props.getBase64(ret);
                    },
                    uploading: function uploading(ret) {
                        that.props.onUploading(ret);
                    },
                    error: function error(ret) {
                        that.props.onFail(ret);
                    },
                    readed: function readed(ret) {
                        that.props.onReaded(ret);
                    }
                });
            }
        }, _this.uploadPicAj = function (pic_base64, name) {
            var data = _extends({
                data: pic_base64,
                storageType: _this.props.storageType,
                filename: name
            }, _this.props.extraData);

            var that = _this;

            (0, _ajax.post)(_this.props.upServer, data, _this.props.ajaxOptions).then(function (response) {
                var ret = {
                    msg: "上传完成",
                    type: 'uploaded',
                    data: response.data.data,
                    code: 100000
                };

                that.props.onSuccess(ret, pic_base64);
            }).catch(function (response) {
                if ((0, _ajax.isCommonError)(response)) return;

                if (response.code) {
                    that.props.onFail({
                        msg: response.msg,
                        type: 'error',
                        data: response.msg,
                        code: 100001
                    });
                } else {
                    that.props.onFail({
                        msg: "网络繁忙，请重试！",
                        type: 'error',
                        data: msg,
                        code: 100005
                    });
                }
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Upload, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'wrap' },
                this.props.children
            );
        }
    }]);

    return Upload;
}(_react2.default.Component);

Upload.propTypes = {
    useJsBridge: _propTypes2.default.bool, // 用JSbridge还是文件上传
    checkSize: _propTypes2.default.bool, // 是否检查文件宽高
    withSize: _propTypes2.default.bool, // 是否检查文件宽高
    watermark: _propTypes2.default.string, // 需要添加的水印文案
    maxFileSize: _propTypes2.default.number, // 文件大小
    imgMaxWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]), // 文件大小
    imgMaxHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]), // 文件宽度
    onSuccess: _propTypes2.default.func, // 成功回调
    getBase64: _propTypes2.default.func, // 获取图片base64
    onFail: _propTypes2.default.func, // 失败回调
    onUploading: _propTypes2.default.func, // 上传中回调
    onReaded: _propTypes2.default.func, // 图片读取结束回调
    upServer: _propTypes2.default.string, // 图片上传服务器
    data: _propTypes2.default.object,
    maxFileNum: _propTypes2.default.number,
    storageType: _propTypes2.default.number, // 上传图片位置，1＝图床，2=微盘
    extraData: _propTypes2.default.object, // 额外需求提交的数据
    fileType: _propTypes2.default.string,
    fileExtensions: _propTypes2.default.string,
    ajaxOptions: _propTypes2.default.object // 额外的aj请求
};
Upload.defaultProps = {
    useJsBridge: false,
    checkSize: false,
    withSize: false,
    watermark: "",
    maxFileSize: 5,
    imgMaxWidth: false,
    imgMaxHeight: false,
    upServer: '/v1/widgets/interface/proxy?api=interface/picture/upload',
    data: {},
    maxFileNum: 1,
    onFail: noop,
    onSuccess: noop,
    getBase64: noop,
    onUploading: noop,
    onReaded: noop,
    storageType: 1,
    extraData: {},
    fileType: 'img',
    fileExtensions: '',
    ajaxOptions: {}
};
exports.default = Upload;
//# sourceMappingURL=index.js.map