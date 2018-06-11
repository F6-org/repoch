import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './slider-n.css';
import Swipe from './swipe';
import { isSame } from '../equal';

export default class NewSlider extends React.Component {
    static propTypes = {
        auto: PropTypes.number,     // 自动slider开始时间
        speed: PropTypes.number,    // slider切换时间
        startSlide: PropTypes.number,   // 起始slider位置
        slideToIndex: PropTypes.number, // 设置渲染完成后slider到哪个位置
        continuous: PropTypes.bool,     // 是否循环
        disableScroll: PropTypes.bool,  // 阻止全部该容器下的touch事件
        stopPropagation: PropTypes.bool,    // 阻止事件冒泡
        reinitSwipeOnUpdate : PropTypes.bool,   // 组件更新时是否重新初始化
        wrapperStyles: PropTypes.object,    // slider外层样式
        containerStyles: PropTypes.object,  // 容器样式
        sliderStyles: PropTypes.object,  // 样式
        shouldUpdate: PropTypes.func,   // 自定义是否重绘方法
        onSliderChange: PropTypes.func,   // slider切换时的回调函数
        transitionEnd: PropTypes.func,   // 动画执行后的回调函数
        isInSlider: PropTypes.func,     // 是否在slider内部滑动
        withDotted: PropTypes.bool      // 是否需要显示点点点
    }

    static defaultProps = {
        isInSlider: () => null,
        withDotted: true,
        onSliderChange: () => null,
        startSlide: 0
    }

    state = {
        selectedIndex: this.props.startSlide
    }

    componentDidMount = () => {
        this.swipe = Swipe(ReactDOM.findDOMNode(this), Object.assign({}, this.props, { callback: this.handleCallBack() }));
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.reinitSwipeOnUpdate || this.props.children.length !== prevProps.children.length) {
            this.swipe.kill();
            this.swipe = Swipe(ReactDOM.findDOMNode(this), Object.assign({}, this.props, { callback: this.handleCallBack() }));
        }
      
        if (this.props.slideToIndex || this.props.slideToIndex === 0) {
            this.swipe.slide(this.props.slideToIndex);
        }
    }

    componentWillUnmount = () => {
        this.swipe.kill();
        this.swipe = null;
    }

    shouldComponentUpdate = (nextProps) => {
        return (
            (this.props.slideToIndex != nextProps.slideToIndex) ||
            (this.props.shouldUpdate && typeof this.props.shouldUpdate === 'function' && 
            this.props.shouldUpdate(nextProps, this.props)) || 
            !isSame(nextProps.children, this.props.children)
        );
    }

    componentWillReceiveProps = (nextProps) => {
        // 属性变化时不重绘slider
        if (this.props.children.length !== nextProps.children.length || nextProps.reinitSwipeOnUpdate) {
            this.setState({ selectedIndex: this.props.startSlide })
        }
    }

    handleCallBack = () => {
        // arrow function 是定义时所在对象，所以此处不指向component,需要这么搞
        var self = this;
        return (index) => {
            if (index >= self.props.children.length) {
                index = index % self.props.children.length;
            }

            self.props.onSliderChange(index);
            self.setState({ selectedIndex: Number(index) });
            self.forceUpdate();
        }
    }

    handleDotClick = (index) => {
        this.swipe && this.swipe.slide(index);
    }

    buildSliders = () => {
        if (!this.props.children.length) return null;
        // 当需要循环时，需要复制两个来适配循环播放
        if (this.props.continuous && this.props.children.length === 2) {
            let temp = this.props.children.map((child, i) => 
                React.cloneElement(child, { 
                    className: "child", 
                    key: i + this.props.children.length
                })
            );
            return temp.concat(temp.map((child, i) => 
                React.cloneElement(child, { 
                    className: "child", 
                    key: i
                })
            ));
        }

        return this.props.children.map((child, i) => 
            React.cloneElement(child, { 
                className: "child", 
                key: i
            })
        );
    }

    buildDots = () => {
        if (!this.props.withDotted || this.props.children.length < 2) { return null; }

        let _styles = this.props.slideStyles || "";

        let children = Array.apply(null, Array(this.props.children.length)).map((item, i) => {
            if (i === this.state.selectedIndex) {
                return (
                    <span key={ i }
                        className={`dots dots_active ${_styles}`}
                        onClick={ this.handleDotClick.bind(this, i) }>
                    </span>
                );
            } else {
                return (
                    <span key={ i }
                        className={`dots ${_styles}`}
                        onClick={ this.handleDotClick.bind(this, i) }>
                    </span>
                );
            }
        });
        return (
            <div className="dots_wrapper" >
                { children }
            </div>
        )
    }

    render() {
        return (
            <div style={ Object.assign({}, this.props.containerStyles) } className="slider-n-container">
                <div style={ Object.assign({}, this.props.wrapperStyles) } className="slider-n-wrapper" >
                    { this.buildSliders() }
                </div>
                { this.buildDots() }
            </div>
        );
    }
}



