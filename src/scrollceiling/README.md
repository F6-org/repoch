## 模块注入组件使用说明

## 使用方法

```
import ScrollCeiling from 'wb-repoch/pipe';

export default class Test extends React.Component {
    render() {
        <ScrollCeiling 
            showCeilingH={200}
            renderScrollCeilingTopNav={<p>123</p>}
            loadMoreDatas={function||null}
            showHandler={function||null}
            hideHandler={function||null}>
            <h1>ScrollCeiling</h1>
        </ScrollCeiling>
    }
}
```
## 参数说明


- `children `: 必选，子元素