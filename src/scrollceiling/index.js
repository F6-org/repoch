import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.style.scss';

/*
* @showCeilingH: 吸顶模块展示时，页面Y轴滑动的距离
* @loadMoreDatas：底部上滑加载更多内容
* @renderScrollCeilingTopNav：吸顶模块
* @showHandler: 吸顶模块吸顶时额外的交互 
* @hideHandler: 吸顶模块不吸顶时额外的交互
* 引用举例： 
    <ScrollCeiling
        showCeilingH={200}
        renderScrollCeilingTopNav={domRender}
        loadMoreDatas={null}
        showHandler={null}
        hideHandler={null}
        >
        <p>123456</p>
    </ScrollCeiling>
*/

class ScrollCeiling extends Component {

    static propTypes = {
        showCeilingH: PropTypes.number.isRequired,
        // renderScrollCeilingTopNav: PropTypes.element.isRequired, //吸顶模块的渲染
        loadMoreDatas: PropTypes.func, // 页面底部上滑，加载更多内容的回调函数 
        showHandler: PropTypes.func, // 吸顶模块展示后的回调函数
        hideHandler: PropTypes.func, // 吸顶模块不展示后的回调函数
    }

    constructor(props) {
        super(props);
        this.touchData = {
            touchStartY: 0,
            touchStartX: 0,
            currentY: 0,
            currentX: 0,
            deltaY: 0,
            lastCurrent: 0,
            touchStartT: 0,
            touchMoveT: 0,
            isTouch: false,
        };
        this.clickNav = true;
        this.virtualTop = 0;
        this.topDragDown = false;
    }

    lock = false;

    componentWillMount = () => {

    }

    componentDidMount = () => {
    }

    componentWillUnmount = () => {

    }

    checkCeiling = () => {
        let vT = -this.virtualTop;
        if (vT >= this.props.showCeilingH) {
            this.refs.topnav.classList.add('show');
            this.props.showHandler && this.props.showHandler();
            this.lock = false;
        }
        else {
            if (!this.lock) {
                this.props.hideHandler && this.props.hideHandler();
                this.lock = true;
            }
            this.refs.topnav.classList.remove('show');
        }
    }

    handleTouchStart = (e) => {
        if (this.scrollAnimate) {
            window.cancelAnimationFrame(this.scrollAnimate);
        }
        this.checkCeiling();
        let y = e.touches[0].pageY,
            x = e.touches[0].pageX;

        this.touchData.touchStartT = +new Date();
        this.touchData.touchStartX = x;
        this.touchData.touchStartY = y;
        this.touchData.lastCurrent = y;
        this.touchData.isTouch = false;
        this.clickNav = false;
    }

    handleTouchMove = (e) => {
        // this.clickNav = false
        this.touchData.currentX = e.touches[0].pageX;
        this.touchData.currentY = e.touches[0].pageY;
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        if (this.virtualTop >= 0 && this.touchData.currentY - this.touchData.touchStartY > 0) {
            //顶部下拉
            this.topDragDown = true;
            this.transformTo(0);
        }
        else {
            this.topDragDown = false;
            let offset = this.touchData.currentY - this.touchData.lastCurrent;
            if (-this.virtualTop > ReactDOM.findDOMNode(this.refs.scrollpage).clientHeight - window.innerHeight) {
                if (offset > 0) {
                    this.transformTo(this.virtualTop + offset);
                }
                else {
                    this.transformTo(this.virtualTop);
                }
            }
            else {
                this.transformTo(this.virtualTop + offset);
            }
        }
        this.touchData.deltaY = this.touchData.currentY - this.touchData.lastCurrent;
        this.touchData.lastCurrent = this.touchData.currentY;
        this.touchData.touchMoveT = +new Date();
        this.checkCeiling();
    }

    handleTouchEnd = (e) => {
        let endT = +new Date();
        if (endT - this.touchData.touchStartT < 300 && Math.abs(this.touchData.lastCurrent - this.touchData.touchStartY) < 30) return; //click
        this.touchData.isTouch = true;
        if (this.topDragDown) {
            this.transformTo(0);
        } else {
            //calc endtop
            let velocity = this.touchData.deltaY * 1 / (endT - this.touchData.touchMoveT);
            let endTop = this.virtualTop + Math.pow(velocity, 3);
            // Math.abs(velocity)// - Math.sqrt(Math.abs(velocity)))
            if (endTop >= 0) {
                endTop = 0;
            } else if (endTop <= -ReactDOM.findDOMNode(this.refs.scrollpage).clientHeight + window.innerHeight) {
                endTop = -ReactDOM.findDOMNode(this.refs.scrollpage).clientHeight + window.innerHeight;
                //上滑加载更多数据
                this.props.loadMoreDatas && this.props.loadMoreDatas();
            }
            this.doAnimation(this.virtualTop, endTop);
        }
        this.checkCeiling()
    }

    doAnimation = (orign, target) => {
        let realOffset = target - orign;
        let runWheelAnimate = (t_delta) => {
            if (!this.scrollAnimateStart) this.scrollAnimateStart = t_delta;
            let progress = t_delta - this.scrollAnimateStart,
                leftTime = 300,
                t = +(progress / (leftTime)).toFixed(4),
                delta = Math.ceil(this.wheelBezier(t, [.8, .8], [.8, 1])[1] * realOffset)
            if (!this.clickNav && orign + delta >= 0) {
                //上滑至顶部
                this.transformTo(0)
                window.cancelAnimationFrame(this.scrollAnimate)
            }
            else {
                if (t >= 1) {
                    this.transformTo(target)
                } else {
                    this.transformTo(orign + delta)
                }
            }
            !this.clickNav && this.checkCeiling()
            if (progress <= leftTime) {
                window.requestAnimationFrame(runWheelAnimate);
            } else {
                window.cancelAnimationFrame(this.scrollAnimate)
                this.scrollAnimateStart = 0
            }
        }
        this.scrollAnimate = window.requestAnimationFrame(runWheelAnimate)

    }

    transformTo(top) {
        let curTop = top > 0 ? 0 : top;
        this.refs.scrollpage.style.WebkitTransform = 'translate(0,' + (curTop) + 'px' + ')';
        this.virtualTop = curTop
    }

    wheelBezier(t, mid1, mid2) {
        // 0 < t < 1
        let ps = [0, 0],
            pe = [1, 1];
        return [
            (1 - t) * (1 - t) * (1 - t) * ps[0] + 3 * (1 - t) * (1 - t) * t * mid1[0] + 3 * (1 - t) * t * t * mid2[0] + t * t * t * pe[0],
            (1 - t) * (1 - t) * (1 - t) * ps[1] + 3 * (1 - t) * (1 - t) * t * mid1[1] + 3 * (1 - t) * t * t * mid2[1] + t * t * t * pe[1]
        ]
    }

    render() {
        return (
            <div className="scroll-page-root">
                <div className="scroll-page-wrapper" ref="scrollpage"
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}>
                    {
                        //页面
                        this.props.children
                    }
                </div>
                <div className="fixed-top" ref="topnav">
                    {
                        //吸顶模块
                        this.props.renderScrollCeilingTopNav && this.props.renderScrollCeilingTopNav()
                    }
                </div>
            </div>
        )
    }

}

export default ScrollCeiling