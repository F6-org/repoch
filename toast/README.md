## 移动端弹层组件使用说明

## 效果图
![手动](http://wx2.sinaimg.cn/large/c43d4727ly1fgn6d45j04j20940400sk.jpg)

## 使用方法
- 使用repoch的'setMsg'方法

```
export default class Test extends React.Component {
    setTipsMsg = (msg) => {
        this.context.createAction("repoch.setMsg", msg);
    }

    handleMsg = () => {
        this.setTipsMsg('备注内容不要超过100字');
    }
    
    render() {
        return (
            <div>
                <a onClick={this.handleMsg}>click to get a toast!</a>
            </div>
        );
    }
}
```

- 手动引用

```
import React from 'react';
import LazyLoad from '@repoch/toast';

export default class Test extends React.Component {
    render() {
        state = {
            err: 'I'm a toast'
        }

        handleToastHide = () => {
            this.setState({
                err: ""
            });
            this.context.createAction("resetErr");
        }

        return (
            <div>
                <Toast content={ this.state.err } onHide={ this.handleToastHide } />
            </div>
        );
    }
}
```

## 参数说明

- `content `: 必传，组件提示文案
- `autohide `: 可选，是否自动隐藏
- `lasttime `: 可选，组件展示时间
- `onShow `: 可选，组件显示后回调函数

- `onHide `: 可选，组件隐藏后的回调函数
- `style `: 可选，属性自带样式继承
- `show `: 可选，是否显示组件
