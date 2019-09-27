//弹窗样式为 两个按钮（左右排列）；当按钮文案传空时，不展示此按钮
//<Alert
//    show={true} //控制显示隐藏
//    title={"huhuhuh"}
//    content={`<p class="f-16">本次参与<i class="f-c-highlight">${must_buy_number}</i>人次</p>`}, //可以传dom节点进去
//    detail="123123123" //副标题
//    onOk={e => console.log(123)}
//    onCancel={e => console.log(123444)}
///>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mask from '../new-mask/index';
import './index.style.scss';

function noop() { }
export default class Alert extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		detail: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		onShow: PropTypes.func, // 组件展示后回调函数
		onHide: PropTypes.func, // 组件隐藏后回调函数
		onOk: PropTypes.func, // 点击按钮后回调
		okText: PropTypes.string, // 按钮文案
		onCancel: PropTypes.func, // 点击按钮后回调
		cancelText: PropTypes.string, // 按钮文案
		hideWhenMaskClick: PropTypes.bool // 点击背景是否隐藏
	}

	static defaultProps = {
		show: false,
		title: '标题',
		detail: '',
		content: '',
		okText: '确定',
		cancelText: '取消',
		onHide: noop,
		onShow: noop,
		onOk: noop,
		onCancel: noop,
		hideWhenMaskClick: true
	}
	
	handleMaskClick = () => {
		if (!this.props.hideWhenMaskClick) return;
		this.props.hideFun && this.props.hideFun();
	}

	handleClick = () => {
		this.props.onOk && this.props.onOk();
		this.props.hideFun && this.props.hideFun();
	}

	handleCancel = () => {
		this.props.onCancel && this.props.onCancel();
		this.props.hideFun && this.props.hideFun();
	}

	render() {
		const { cancelText, okText, content, title, detail, children } = this.props;
		return (
			<Mask show={this.props.show} close={this.handleMaskClick} disableTouchMove={true}>
				<div className={`v-alert-root ${this.props.show ? 'show' : ''}`}>
					<div className={ (detail || content || children) ? 'alert-txt-wrapper' : 'alert-txt-wrapper alert-txt-wrapper-special'  }>
						<h3 className="title">{title}</h3>
						<p className="detail">{detail}</p>
						{
							<p dangerouslySetInnerHTML={{ __html: content }} />
						}
						{React.Children.toArray(children)}
					</div>
						
					<div className="alert-btn-wrapper">
						{cancelText && <a className="btn-cancel" onClick={this.handleCancel}>{cancelText}</a>}
						{okText && <a className="btn-ok" onClick={this.handleClick}>{okText}</a>}
					</div>
				</div>
			</Mask>
		);
	}
}