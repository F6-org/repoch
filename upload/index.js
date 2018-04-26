import PropTypes from 'prop-types';
import React from 'react';
import addEventListener from 'dom-helpers/events/on';
import querySelectorAll from 'dom-helpers/query/querySelectorAll';
import pickImage from '../weibo-jsbridge/pick-image';
import uploader from './uploader';
import { post, isCommonError } from '../ajax';

function noop() {}
const PICK_CODE = {
    403: '非法调用',
    500: '客户端内部错误',
    501: '客户端未实现此动作',
    550: '客户端没有获取到结果',
    553: '相关服务未启用'
};

export default class UploadPic extends React.Component {
    static propTypes = {
        useJsBridge: PropTypes.bool, // 用JSbridge还是文件上传
        checkSize: PropTypes.bool, // 是否检查文件宽高
        withSize: PropTypes.bool, // 是否检查文件宽高
        watermark: PropTypes.string, // 需要添加的水印文案
        maxFileSize: PropTypes.number, // 文件大小
        imgMaxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]), // 文件大小
        imgMaxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]), // 文件宽度
        onSuccess: PropTypes.func, // 成功回调
        getBase64: PropTypes.func, // 获取图片base64
        onFail: PropTypes.func, // 失败回调
        onUploading: PropTypes.func, // 上传中回调
        onReaded: PropTypes.func, // 图片读取结束回调
        upServer: PropTypes.string,  // 图片上传服务器
        data: PropTypes.object,
        maxFileNum: PropTypes.number,
        storageType: PropTypes.number, // 上传图片位置，1＝图床，2=微盘
        extraData: PropTypes.object, // 额外需求提交的数据
        fileType: PropTypes.string,
        fileExtensions: PropTypes.string,
        ajaxOptions: PropTypes.object // 额外的aj请求
    };

    static defaultProps = {
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

    componentDidMount = () => {
        let container = this.refs.wrap;
        let that = this;

        if (this.props.useJsBridge) {
            let targetNode = querySelectorAll(container, '[data-type="uploadBtn"]');
            targetNode = targetNode.length ===0 ? container : targetNode[0];

            addEventListener(targetNode, 'click', function(e) {
                pickImage({
                    camera: true,
                    onSuccess: function(pic_base64) {
                        var ret = {
                            msg: "文件已获取",
                            type: 'readed',
                            data: pic_base64,
                            code: 100006
                        };
                        that.props.onReaded(ret);

                        that.uploadPicAj(pic_base64, 'jsbridge');
                    },
                    onFail: function(code) {
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
            uploader(container, {
                upServer: this.props.upServer,
                data: this.props.data,
                checkSize: this.props.checkSize,
                withSize: this.props.withSize,
                watermark: this.props.watermark,
                maxFileSize: this.props.maxFileSize,
                maxFileNum: this.props.maxFileNum,
                imgMaxWidth: this.props.imgMaxWidth,
                imgMaxHeight: this.props.imgMaxHeight,
                storageType: this.props.storageType,
                fileFilter: this.props.fileType,
                fileExtensions: this.props.fileExtensions,
                uploaded: function(ret) {
                    if (ret.code === 100000) {
                        that.props.onSuccess(ret);
                    } else {
                        that.props.onFail(ret);
                    }
                },
                getBase64: function(ret) {
                    that.props.getBase64(ret);
                },
                uploading: function(ret) {
                    that.props.onUploading(ret);
                },
                error: function(ret) {
                    that.props.onFail(ret);
                },
                readed: function(ret) {
                    that.props.onReaded(ret);
                }
            });
        }
    }

    uploadPicAj = (pic_base64, name) => {
        var data = Object.assign({
            data: pic_base64,
            storageType: this.props.storageType,
            filename: name
        }, this.props.extraData);

        let that = this;

        post(
            this.props.upServer, 
            data, 
            this.props.ajaxOptions
        ).then(response => {
            var ret = {
                msg: "上传完成",
                type: 'uploaded',
                data: response.data.data,
                code: 100000
            };
            
            that.props.onSuccess(ret, pic_base64);
        }).catch(response => {
            if (isCommonError(response)) return;

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
                })
            }
        });
    }

    render() {
        return (
            <div ref="wrap">
                { this.props.children }
            </div>
        );
    }
}

