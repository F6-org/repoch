import PropTypes from 'prop-types';
/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { transition, listenTransition } from '../dom-helper/util/transition';

import './listview.css';
// import withStyles from '@repoch/with-styles';

const SCROLLER_CHECK_DURATION = 50;
const TOUCHMOVE_CHECK_DURATION = 500;
const PULL_MAX_DURATION = 200;
const PULLED_DOWN = 1;
const STATUS_DEFAULT = 11;
const STATUS_PREPARE = 12;
const STATUS_LOAD = 13;

export default class ListView extends React.Component {
    static propTypes = {
        threshold: PropTypes.number, // 拖拽阈值
        pullUpThreshold: PropTypes.number, // 上拉补偿值
        onLoaderStatusChange: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func
        ]), // 下拉样式处理函数
        showNoContent: PropTypes.bool,
        isPullDownDisabled: PropTypes.bool, //是否禁止下拉刷新功能，默认false不禁止
        content: PropTypes.string,
        wrapperClassName: PropTypes.string,
        scrollerClassName: PropTypes.string,
        compatSlider: PropTypes.bool,
        id: PropTypes.string,
        onPullDown: PropTypes.func, // 刷新事件
        onPullUp: PropTypes.func // 加载事件
    };

    static defaultProps = {
        threshold: 40,
        pullUpThreshold: 40,
        onLoaderStatusChange: false,
        isPullDownDisabled: false,
        wrapperClassName: '' || 'component_wrapper_list',
        scrollerClassName: '' || 'component_scroller_list',
        showNoContent: false,
        compatSlider: false,
        id: 'listview',
        onPullDown: function() {},
        onPullUp: function() {}
    };
    // 禁止下拉刷新
    // isPullDownDisabled = true;

    componentDidMount = () => {
        this._hasMounted = true;
        this._draggable = true;
        this._canTouchMove = false;

        this.scrollCheckTimer = null;
        this.touchMoveTriggerTimer = null;

        this.wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
        this.scroller = ReactDOM.findDOMNode(this.refs.list);
        this.createPullUpRegion();

        // 使用真实的时间，阻止ios页面bounce效果
        document.body.addEventListener('touchmove', this.handleDocumentTouchMove);

        this.wrapper.addEventListener('touchstart', this.handleTouchStart);
        this.wrapper.addEventListener('touchmove', this.handleTouchMove);
        this.wrapper.addEventListener('touchend', this.handleTouchEnd);
        this.wrapper.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate = () => {
        this.createPullUpRegion();
    }

    componentWillUnmount = () => {
        this._hasMounted = false;
        // 使用真实的时间，阻止ios页面bounce效果
        document.body.removeEventListener('touchmove', this.handleDocumentTouchMove);

        this.wrapper.removeEventListener('touchstart', this.handleTouchStart);
        this.wrapper.removeEventListener('touchmove', this.handleTouchMove);
        this.wrapper.removeEventListener('touchend', this.handleTouchEnd);
        this.wrapper.removeEventListener('scroll', this.handleScroll);
    }

    createPullDownRegion = () => {
        this.removePullDownRegion();
        this.header = document.createElement('div');
        this.header.className = 'latest';
        this._touchCoords.status = this.processLoaderStatus(PULLED_DOWN, 0, null, true);
        this.wrapper.insertBefore(this.header, this.scroller);
        return this.header;
    }

    removePullDownRegion = () => {
        if (this.header) {
            this.wrapper.removeChild(this.header);
            this.header = null;
        }
    }

    createPullUpRegion = () => {
        if (!this.footer) {
            this.footer = document.createElement('div');
            this.wrapper.appendChild(this.footer);
        }
        if (this.wrapper.clientHeight >= this.scroller.offsetHeight ||
            this.props.showNoContent
        ) {
        // if (
        //     this.props.showNoContent
        // ) {
            this.disablePullUp(true);
            this.footer.className = 'loader';
            this.footer.innerHTML = `<p class='non_cont'>${this.props.content}</p>`;
            this.footer.style.height = this.props.threshold * 1.25 * 2 * 0.01 + 'rem';
        } else {
            this.disablePullUp(false);
            this.footer.className = 'loader';
            this.footer.innerHTML = '' +
                '<div class=' + "loader" + '>' +
                    '<em class=' + "pull-loading" + '></em>' +
                    '<span>加载中...</span>' +
                '</div>';
            this.footer.style.height = this.props.threshold * 2 * 0.01 + 'rem';
        }
    }

    handleLoaderStatusChange = status => {
        let helper = this.props.onLoaderStatusChange || function(status) {
            if (status === STATUS_DEFAULT) {
                return '<div class="' + "loader" + '">' +
                  '<em class="' + "pull-down" + '"></em>' +
                  '<span>下拉刷新</span>' +
                '</div>';
            } else if (status === STATUS_PREPARE) {
                return '<div class="' + "loader" + '"">' +
                  '<em class="' + "pull-up" + '"></em>' +
                  '<span>释放更新</span>' +
            '</div>';
            } else if (status === STATUS_LOAD) {
                return '<div class="' + "loader" + '">'+
                  '<em class="' + "pull-loading" + '"></em>'+
                  '<span>加载中...</span>'+
                '</div>';
            }
        };

        if (this.header && helper && typeof helper === 'function') {
            this.header.innerHTML = helper.call(this, status);
        }
    }

    processLoaderStatus = (orient, offsetY, currentStatus, moved) => {
        let overflow, nextStatus = currentStatus;
        if (orient === PULLED_DOWN) {
            overflow = offsetY > this.props.threshold * 2;
            if (!overflow && currentStatus !== STATUS_DEFAULT) {
                this.handleLoaderStatusChange(STATUS_DEFAULT);
                nextStatus = STATUS_DEFAULT;
            } else if (moved && overflow && currentStatus !== STATUS_PREPARE) {
                this.handleLoaderStatusChange(STATUS_PREPARE);
                nextStatus = STATUS_PREPARE;
            } else if (!moved && overflow && currentStatus !== STATUS_LOAD) {
                this.handleLoaderStatusChange(STATUS_LOAD);
                this.props.onPullDown(this.reset);
                nextStatus = STATUS_LOAD;
            }
        }

        return nextStatus;
    }

    handleDocumentTouchMove = e => {
        let agent = navigator.userAgent.toLowerCase();
        if ((agent.indexOf("iphone") >= 0 || agent.indexOf("ipad") >= 0) &&
            (this._touchCoords && this._touchCoords.pullDown) && e.isScroller) {
            // e.preventDefault();
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.preventDefault) {
                    e.preventDefault();
                }
            }
        }
    }

    handleTouchStart = e => {
        this._canTouchMove = false;
        let startScrollY =  this.wrapper.scrollTop;

        if (this._draggable && 
                (this.props.isPullDownDisabled !== true || 
                    this.isPullUpDisabled !== true)
        ) {
            this._draggable = false;
            this._canTouchMove = true;

            let point = e.touches && e.touches[0];

            this._pointX = point.pageX;
            this._pointY = point.pageY;
            this._startMove = true;

            this._touchCoords = {};
            this._touchCoords.startY = e.touches[0].screenY;
            this._touchCoords.startScrollY = startScrollY;
        }
    }

    handleTouchMove = e => {
        e.isScroller = true;
        this.touchMoveTriggerTimer && clearTimeout(this.touchMoveTriggerTimer);

        if (this._canTouchMove && this.props.compatSlider && this._startMove) {
            let point = e.touches && e.touches[0];
            let deltaX = point.pageX - this._pointX;
            let deltaY = point.pageY - this._pointY;

            this._startMove = false;
            this._canTouchMove = Math.abs(deltaX) > Math.abs(deltaY) ? false : true;
            this._draggable = !this._canTouchMove;
        }

        if (!this._canTouchMove) return;
        // e.stopPropagation();

        let coords = this._touchCoords;
        let startScrollY = coords.startScrollY;
        let blockY = coords.blockY;
        let startY = coords.startY;
        let stopY = e.touches[0].screenY;
        let offsetY, overY;

        if (typeof coords.canPullDown === 'undefined') {
            coords.canPullDown = this.props.isPullDownDisabled !== true && 
                    startY < stopY && startScrollY <= 0;
        }
        if (coords.canPullDown && (coords.pullDown || startY - stopY + startScrollY < 0)) {
            // e.preventDefault(); 新版chrome对这块有处理
            coords.pullDown = true;
            if (!this.header) {
                this.header = this.createPullDownRegion();
            }
            if (typeof blockY === 'undefined') {
                coords.blockY = blockY = stopY;
            }
            offsetY = stopY - blockY;
            offsetY = offsetY > 0 ? offsetY : 0;

            // 阻尼
            let threshold = this.props.threshold;
            overY = offsetY - threshold;
            if (overY > 100) {
                offsetY = threshold + 75 + (overY - 100) * 0.25;
            } else if (overY > 50) {
                offsetY = threshold + 50 + (overY - 50) * 0.5;
            }
            this.header.style.height = offsetY * 2 * 0.01 + 'rem';
            coords.status = this.processLoaderStatus(PULLED_DOWN, offsetY, coords.status, true);
        } else {
            coords.blockY = stopY;
        }

        this.touchMoveTriggerTimer = setTimeout(() => {
            this.handleTouchEnd();
            this.touchMoveTriggerTimer = null;
        }, TOUCHMOVE_CHECK_DURATION);
    }

    handleTouchEnd = e => {
        this.touchMoveTriggerTimer && clearTimeout(this.touchMoveTriggerTimer);
        this.touchMoveTriggerTimer = null;

        if (!this._canTouchMove) {
            return;
        } else {
            // e && e.stopPropagation();
        }

        this._canTouchMove = false;
        this.doTransition();
    }

    checkScrollEnd = node => {
        if (node.offsetHeight + node.scrollTop >= 
            node.scrollHeight - this.props.pullUpThreshold
        ) {
            !this.isPullUpDisabled && this.props.onPullUp(this.reset);
        }
        this.scrollCheckTimer = null;
    }

    handleScroll = e => {
        this.scrollCheckTimer && clearTimeout(this.scrollCheckTimer);
        this.scrollCheckTimer = setTimeout(
            this.checkScrollEnd.bind(this, e.target), 
            SCROLLER_CHECK_DURATION
        );
    }

    handleTransitionEnd = (orient, targetHeight) => {
        let coords = this._touchCoords;
        coords.status = this.processLoaderStatus(orient, targetHeight, coords.status, false);
        if (!orient || coords.status !== STATUS_LOAD) {
            this.removePullDownRegion();
            this._touchCoords = null;
            this._draggable = true;
            this._canTouchMove = false;
        }
    }

    doTransition = () => {
        let coords = this._touchCoords;
        if (!coords) return;
        let orient = coords.pullDown ? PULLED_DOWN : null;
        if (orient === PULLED_DOWN) {
            let target = this.header;
            let targetHeight = target && target.offsetHeight || 0;
            let threshold = this.props.threshold;
            let adjustHeight = targetHeight > threshold ? threshold : 0;

            let duration = (targetHeight - adjustHeight) / 
                    threshold * PULL_MAX_DURATION;
            duration = duration > PULL_MAX_DURATION ? PULL_MAX_DURATION : 
                    Math.ceil(duration);

            let endHandler = () => this.handleTransitionEnd(orient, targetHeight);
            listenTransition(target, duration, endHandler);

            target.style[transition] = 'height ' + duration + 'ms';
            setTimeout(function() {
                target.style.height = adjustHeight * 2 * 0.01 + 'rem';
            }, 0);
        } else {
            this.handleTransitionEnd(orient, 0);
        }
    }

    reset = () => {
        if (!this._hasMounted) return;
        this.doTransition();
    }

    // disablePullDown = disabled => {
    //     this.props.isPullDownDisabled = disabled;
    // }

    disablePullUp = disabled => {
        this.isPullUpDisabled = disabled;
    }
    
    render() {
        return (
            <div ref='wrapper' id={ this.props.id } className={ this.props.wrapperClassName + ' wrapper'}
                
            >
                <div ref='list' className={ this.props.scrollerClassName }>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

ListView.scrollTo = (scrollTop) => {
    let node = document.getElementById('listview');
    if (node) {
        node.scrollTop = scrollTop + 'px';
    }
};

// export default withStyles(styles)(ListView);

