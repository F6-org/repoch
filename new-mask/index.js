import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './style.scss';
/**
 * @author zhenkun
 * @export 灰底折罩，容器型组件
 * @prop {关闭弹层函数} close
 * @prop {定制的背景遮罩} style
 * @prop {是否显示弹层} show
 */
class Mask extends Component {

    disableTouchMove = (e) => {
        const { disableTouchMove = true } = this.props;
        if (!disableTouchMove) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.nativeEvent.preventDefault();
        return false;
    }

    render() {

        const { close = () => { }, style, show = false } = this.props;

        return (
            <div className='mask-root'>
                <div className={`mask-layer ${show ? 'show' : ''}`} style={style} onClick={close} onTouchMove={this.disableTouchMove} ></div>
                <div className='mask-content'>
                    {
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}

export default Mask;