## 移动端弹层基类组件使用说明
帮助各种移动端端弹层组件（文案、菜单等）居中、禁止点击、滚动等的蒙层组件

## 使用方法

```
export default class Test extends React.Component {
    render() {
        setTipsMsg = (msg) => {
            this.context.createAction("repoch.setMsg", msg);
        }

        handleMsg = () => {
            this.setTipsMsg('备注内容不要超过100字');
        }

        return (
            <div>
                <a onClick={this.handleMsg}>click to get a toast!</a>
            </div>
        );
    }
}
```

## 参数说明

- `show `: 可选，展示 or 隐藏组件
- `onShow `: 可选，展示组件后的回调
- `onHide `: 可选，隐藏组件后的回调
- `onEscapeKeyUp `: 可选，按ESC键的回调

- `transition `: 可选，是否动画过渡
- `transitionClassOpts `: 可选，若采用动画过度，动画执行的参数

- `maskStyle `: 可选，蒙层组件的内联样式
- `onMaskClick `: 可选，点击蒙层以后的回调
- `maskClassName `: 可选，蒙层组件的class名

- `className `: 可选，组件的继承class
- `isMiddle `: 可选，是否居中显示
- `withMask `: 可选，是否有遮罩层
- `children `: 可选，孩子节点
- `pos `: 可选，不居中的话指定弹层位置
- `zIndex `: 可选，指定纵向索引
