# upload使用手册

------
## 效果描述

1. 选择上传文件
![upload1_image](http://wx2.sinaimg.cn/large/c43d4727ly1fgn47vk4blj20k00esgn9.jpg)

2. 通过回调处理上传各阶段的结果

## 使用方法
    <UploadPic
        upServer={ `/aj/admin/upload` } 
        checkSize={ true }
        imgMaxWidth={ 640 }
        imgMaxHeight={ 320 }
        useJsBridge={ false }
        onSuccess={ this.handleUpSuccess }
        onUploading = { this.handleUpLoading }
        onFail={ this.handleUpFail }>
        <a href="javascript:;" className="W_btn_b upload_btn">
            { this.state.largeLoading?
                <i className="W_loading"></i>:
                <em className="W_ficon ficon_add S_ficon">+</em>
            }
            {this.props.largeImage?"重新上传":"上传"}
        </a>
        <input
            type="file"
            style={{ position: 'absolute', top: '84px', left: '11px', zIndex: 10000, width: '62px', height: '26px', opacity: 0, cursor:"pointer" }}
            data-type="uploadBtn"
        />
    </UploadPic>
## 参数说明
- useJsBridge: 可选，boolean，默认false，是否用JSbridge上传文件
- checkSize: 可选, boolean, 默认false，是否检查文件宽高
- watermark: 可选，string, 默认空，需要添加的水印文案
- maxFileSize: 可选，number, 默认5，文件大小，默认5M
- imgMaxWidth: 可选，number，图片最大宽度，默认512px
- imgMaxHeight: 可选，number，图片最大高度，默认200px
- onSuccess: 必填，上传成功的回调
- onFail: 必填, 上传失败的回调
- onUploading: 可选, 上传中回调
- onReaded: 可选, 图片读取结束回调
- upServer: 可选，图片上传服务器，默认 /v1/widgets/interface/proxy?api=interface/picture/upload
- storageType: 可选，number, 默认1，上传图片位置，1＝图床，2=微盘
- extraData: 可选，object, 默认空，额外需求提交的数据
- fileType: 可选，string, 默认'img'，上传文件的类型
- ajaxOptions: 可选，object，默认为空，额外的aj请求

## 文件类型选择
- 图像
    - 'gif'  : 'image/gif',
    - 'jpeg' : 'image/jpeg',
    - 'jpg'  : 'image/jpeg',
    - 'png'  : 'image/png',
    - 'tif'  : 'image/tiff',
    - 'tiff' : 'image/tiff',
    - 'bmp'  : 'image/bmp',
    - img: "jpg,png,gif,jpeg,bmp",
    - doc: "doc,docx,xls,xlsx,ppt,pptx,pdf,txt",
    - all: "jpg,png,gif,jpeg,bmp,doc,docx,xls,xlsx,ppt,pptx,pdf,txt"
- 文档
    - 'doc'  : 'application/msword',
    - 'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    - 'dot'  : 'application/msword',
    - 'ppt'  : 'application/vnd.ms-powerpoint',
    - 'pptx' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    - 'pps'  : 'application/vnd.ms-powerpoint',
    - 'pot'  : 'application/vnd.ms-powerpoint',
    - 'xls'  : 'application/vnd.ms-excel',
    - 'xlsx' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    - 'xlc'  : 'application/vnd.ms-excel',
    - 'xlm'  : 'application/vnd.ms-excel',
    - 'xlt'  : 'application/vnd.ms-excel',
    - 'pdf'  : 'application/pdf',
    - 'mpp'  : 'application/vnd.ms-project',
    - 'txt'  : 'text/plain',
    - 'text' : 'text/plain',
    - 'wps'  : 'application/vnd.ms-works',
    - 'wdb'  : 'application/vnd.ms-works',
    - 'rtf'  : 'application/rtf,text/rtf',
    - 'htm'  : 'text/html',
    - 'html' : 'text/html',
    - 'xhtml': 'application/xhtml+xml',
    - 'xml'  : 'application/xml,text/xml',
    - 'js'   : 'text/javascript,application/javascript',
    - 'json' : 'application/json',
    - 'css'  : 'text/css',
    - 'csv'  : 'text/csv',
    - 'zip'  : 'aplication/zip',
    - 'dtd'  : 'application/xml-dtd',
    - 'asf'  : 'application/vnd.ms-asf',
- 音频
    - '3gpp' : 'audio/3gpp,video/3gpp',
    - 'ac3'  : 'audio/ac3',
    - 'ogg'  : 'application/ogg,audio/ogg',
    - 'mp3'  : 'audio/mpeg',
    - 'mp2'  : 'audio/mpeg,video/mpeg',
    - 'mp4'  : 'audio/mp4,video/mp4',
    - 'au'   : 'audio/basic',
- 视频
    - 'mpeg' : 'video/mpeg',
    - 'mpg'  : 'video/mpeg'