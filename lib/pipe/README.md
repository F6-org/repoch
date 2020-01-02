## 模块注入组件使用说明

## 使用方法

```
import Pipe from 'wb-repoch/pipe';

export default class Test extends React.Component {
    render() {
        <Pipe container={ props.container || null }>
            <h1>Pipe</h1>
        </Pipe>
    }
}
```

## 参数说明

- `container `: 可选，容器
- `children `: 可选，子元素
