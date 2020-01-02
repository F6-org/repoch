## 移动端列表弹层组件使用说明

## 效果图
![手动](http://wx1.sinaimg.cn/mw1024/a14df729ly1fgpgwf90s9j20d90883ys.jpg)

## 使用方法

```
import Popup from 'wbpay-repoch/popup';

export default class Test extends React.Component {
    state = {
        showPop: false,
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
    
    render() {
        let popOption = this.getPopupOptions();

        return (
            <Popup show={ this.state.showPop } { ...popOption } />
        );
    }
}
```

## 参数说明

- `content `: 可选，组件提示文案

- `onShow `: 可选，组件显示后回调函数
- `onHide `: 可选，组件隐藏后的回调函数
- `onChoose `: 可选，选择某项后回调函数
- `cancelText `: 可选，弹层取消按钮文案

- `data `: 可选，弹层选项数组
- `hideWhenMaskClick `: 可选，点击蒙层是否隐藏组件
