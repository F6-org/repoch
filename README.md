## Demo
```javascript
//现有组件调用DEMO
import './index.style.scss';
import React, {Component} from 'react';
import {Link} from 'react-router';
import setTitle from '../../containers/setTitle';
import Toast from 'wbpay-repoch/toast';
import TopNav from 'wbpay-repoch/topNav';
import Popup from 'wbpay-repoch/popup';
import UploadPic from 'wbpay-repoch/upload';
import Alert from 'wbpay-repoch/alert';
import NewSlider from 'wbpay-repoch/slider-n';
import DatePicker from 'wbpay-repoch/date-picker';

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


## scheme 相关

```javascript
import { scheme, schemekk, weiboShare,navigationCloseAndOpen, historyBackAddUrl } from './navigation'


    window.location.href = scheme('http://www.weibo.com') //普通webview
    window.location.href = schemekk('http://www.weibo.com') //kk webview
    window.location.href = weiboShare('#文案#',['12ski22938j3hf00ll', 'klasjdkljiowq12312321]') //发布器(文案[,图片pid])
    navigationCloseAndOpen('http://www.weibo.com')//关闭当前页并打开新页

    historyBackAddUrl('http://weibo.com/index')//点击返回时添加一个页面


```