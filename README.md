##开发说明
####根据社区规范，src为开发目录，lib为编译后文件。开发完毕执行打包命令
####开发完毕后需更新版本号，当前功能优化改第三位数字，新功能改第二位数字，改版改第三位数字

## Demo
```javascript
//现有组件调用DEMO
import './index.style.scss';
import React, {Component} from 'react';
import {Link} from 'react-router';
import setTitle from '../../containers/setTitle';
import Toast from 'wbpay-repoch/lib/toast';
import TopNav from 'wbpay-repoch/lib/topNav';
import Popup from 'wbpay-repoch/lib/popup';
import UploadPic from 'wbpay-repoch/lib/upload';
import Alert from 'wbpay-repoch/lib/alert';
import NewSlider from 'wbpay-repoch/lib/slider-n';
import DatePicker from 'wbpay-repoch/lib/date-picker';

class Building extends Component {

    state = {
        navCurrentTitle: 0,
        showPop: true,
        currentId: '',
        currentIndex: 0
    }

    getPopupOptions = () => {
        let res = {};
        res.content = '确认取消该众筹？';
        res.data = [{ val: 'submit', text: '确认' }];
        res.onChoose = this.handlePopChoose;
        res.onHide = () => {
            this.setState({
                showPop: false,
                currentId: '',
                currentIndex: 0
            });
        };
        return res;
    }

    componentDidMount = () => {
    }

    handleClickTitleNav = (index) => {
        this.setState({ navCurrentTitle : index });
    }

	render() {
        let popOption = this.getPopupOptions();
		return (
			<div className="v-building-root">
                <TopNav 
                    menuList={ [{name:"123"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}, {name:"222"}, {name:"444"}, {name: "4444"}] } 
                    selected_index={ this.state.navCurrentTitle }
                    onChangeNav={ this.handleClickTitleNav }
                />
                <NewSlider
                    continuous={ true }
                    speed={ 300 }
                    isInSlider={ this.compatSlider }
                    auto = { 6000 }
                    startSlide={ 0 }
                    slideStyles = { "lala" }
                    withDotted={ true }>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                    <img src="https://wx3.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fqhs9xozoqj20jr0b4ab7.jpg"></img>
                </NewSlider>
                {
                    // <Toast content={ '你好' } show={true}/>
                }
                <Alert content={"hahaha"} show={false}/>
                {
                    // <Popup show={ this.state.showPop } { ...popOption } />
                }
                {
                //     <UploadPic
                //     upServer={ `/aj/admin/upload` } 
                //     checkSize={ true }
                //     imgMaxWidth={ 640 }
                //     imgMaxHeight={ 320 }
                //     useJsBridge={ false }
                //     onSuccess={ this.handleUpSuccess }
                //     onUploading = { this.handleUpLoading }
                //     onFail={ this.handleUpFail }>
                //     <a href="javascript:;" className="W_btn_b upload_btn">
                //         { this.state.largeLoading?
                //             <i className="W_loading"></i>:
                //             <em className="W_ficon ficon_add S_ficon">+</em>
                //         }
                //         {this.props.largeImage?"重新上传":"上传"}
                //     </a>
                //     <input
                //         type="file"
                //         style={{ position: 'absolute', top: '84px', left: '11px', zIndex: 10000, width: '62px', height: '26px', opacity: 0, cursor:"pointer" }}
                //         data-type="uploadBtn"
                //     />
                // </UploadPic>
                }
                {
                // <DatePicker 
                //     show={ true }
                //     dateFormat='yyyy-MM-dd.hh.mm'
                //     selectStyle={ [{width: "55%"}, {width: "18%"}, {width: "18%"}] }
                // />
            }
            </div>
		)
	}
}

export default Building;

```

## Test
```javascript
npm install
npm test
```

##Build
```javascript
npm run build
```
## scheme 相关

```javascript
import { scheme, schemekk, weiboShare,navigationCloseAndOpen, historyBackAddUrl } from './navigation'


    window.location.href = scheme('http://www.weibo.com') //普通webview
    window.location.href = schemekk('http://www.weibo.com') //kk webview
    window.location.href = weiboShare('我在#微博抓娃娃#畅享盛夏充值狂欢月！必中转盘、2018元现金红包、充值返币券...话不多说，我去充充充不停！'+ encodeURIComponent('https://wawa.weibo.com/promotion/view?id=1528947878169') , ', 'klasjdkljiowq12312321]') //发布器(文案[,图片pid])
    navigationCloseAndOpen('http://www.weibo.com')//关闭当前页并打开新页

    historyBackAddUrl('http://weibo.com/index')//点击返回时添加一个页面


```