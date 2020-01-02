import PropTypes from 'prop-types';
import React from 'react';
import styles from './alert.css';
import Modal from '../modal';

function noop() {}
export default class Alert extends React.Component {
    static propTypes = {
        content: PropTypes.oneOfType([
             PropTypes.object.isRequired,
             PropTypes.string.isRequired
        ]), // 提示文案
        onShow: PropTypes.func, // 组件展示后回调函数
        onHide: PropTypes.func, // 组件隐藏后回调函数
        onOk: PropTypes.func, // 点击按钮后回调
        okText: PropTypes.string, // 按钮文案
        contentAlign: PropTypes.string, // 文案对齐方式 
        hideWhenMaskClick: PropTypes.bool // 点击背景是否隐藏
    }

    static defaultProps = {
        okText: '确定',
        onHide: noop,
        onShow: noop,
        onOk: noop,
        contentAlign: 'center',
        hideWhenMaskClick: false
    }

    state = {
        show: this.props.show
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ show: nextProps.show });
    }

    entered = () => {
        this.props.onShow();
    }

    exited = () => {
        this.props.onHide();
    }

    handleMaskClick = () => {
        if (!this.props.hideWhenMaskClick) return;
        this.setState({ show: false });
    }

    handleClick = () => {
        this.props.onOk();
        this.setState({ show: false });
    }

    render() {
        return (
            <Modal
                show={ this.state.show }
                transition={ false }
                onShow={ this.entered }
                onHide={ this.exited }
                withMask={ true }
                isMiddle={ true }
                onMaskClick={ this.handleMaskClick }
            >
                <div className="E_layer">
                    <div className="content">
                        <div className="layer_common" style={{textAlign: this.props.contentAlign}}>
                            { this.props.content }
                        </div>
                        <ul className="E_layer_btn">
                            <li>
                                <a onClick={ this.handleClick } className="E_btn_grey btn_ok">
                                    { this.props.okText }
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>
        );
    }
}

