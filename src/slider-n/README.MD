# 轮播图组件

## 效果图
![效果图](http://wx4.sinaimg.cn/large/c43d4727ly1fgn0gdpofqj20i606emy1.jpg)

## 使用方法

```
import React from 'react';
import NewSlider from '@repoch/slider-n';

export default class Test extends React.Component {
    getSliderData = () => <img></img>;

    render() {
        return (
            <NewSlider
                continuous={ true }
                speed={ 300 }
                isInSlider={ this.compatSlider }
                sudaFunc={ suda }
                auto = { 6000 }
                startSlide={ 0 }
                slideStyles = { styles }
                withDotted={ true }>
                { this.getSliderData() }
            </NewSlider>
        );
    }
}
```

## 参数说明



## 常见问题


