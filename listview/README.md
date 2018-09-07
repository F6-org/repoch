# 原生加载组件

## 效果图

## 使用方法

```
import React from 'react';
import ListView from 'wbpay-repoch/listview';

export default class Test extends React.Component {
    getListData = () => <img></img>;

    render() {
        return (
            <ListView 
                content={ '没有更多内容了' }
                wrapperClassName="wrapper_list" 
                onPullUp={ this.handlePullUp }
                onPullDown={ this.handlePullDown }
                showNoContent={ this.props.showNoContent }
            >
                <div>
                    <div className='projectList'>
                        { this.getListData() }
                    </div>
                </div>
            </ListView>
        );
    }
}
```

## 参数说明
content: 没有更多内容文案
wrapperClassName：对滚动区域增加的类名，主要是增加top（滚动区域距离屏幕顶部）和bottom值（滚动区域距离屏幕底部），默认是top:0;bottom:0;
onPullUp：上拉加载回调函数
onPullDown: 下拉刷新回调函数
showNoContent: 是否展示content （boolean值）
isPullDownDisabled：是否禁止下拉刷新功能，默认false=不禁止（boolean值）

## 常见问题
下拉刷新函数必须执行reset，把滚动图标隐藏回去
    handlePullDown = reset => {
        reset();
    }

