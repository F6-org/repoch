## 动画渲染组件使用说明

## 使用方法

```
import Transition from '@repoch/transition';

export default class Test extends React.Component {
	state = {
		show: false
	}
	
    render() {
        <Transition
            ref="container"
            in={ this.state.show }
            timeout={ 1000 }
            onExited={ ()=>{} }
            onEntered={ ()=>{} }
            { ...this.props.transitionClassOpts }
        >
        	something...
        </Transition>
    }
}
```

## 参数说明

- `in `: 可选，展示 or 隐藏组件
- `unmountOnExit `: 可选，是否在不展示组件后销毁组件
- `transitionAppear `: 可选，组件初次渲染时，是否执行动画
- `timeout `: 可选，动画的执行延迟，用来确保节点可执行，初始值为5秒，适当设置

- `enteredClassName `: 可选，组件渲染后的class
- `enteringClassName `: 可选，组件渲染过程中的class
- `onEnter `: 可选，组件设置渲染中class之前的回调
- `onEntering `: 可选，组件设置渲染中class之后的回调
- `onEntered `: 可选，组件设置渲染后的class之后的回调

- `exitedClassName `: 可选，组件退出后的class
- `exitingClassName `: 可选，组件退出过程中的class
- `onExit `: 可选，组件设置退出过程中的class之前的回调
- `onExiting `: 可选，组件设置退出过程中的class之后的回调
- `onExited `: 可选，组件设置退出后的class之后的回调
