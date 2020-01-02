/*
 * @param{
 * show: bool
 * text: string或dom皆可
 * icon:'info/success/error/loading'
 * autoHideDuration:INT 
 * afterClose: ()=>{}
 */
import './style.scss';
import React, {Component} from 'react';
// import classNames from 'classnames';

class Toast extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return this.props.show != nextProps.show || this.props.text != nextProps.text
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
        this.timer = null
    }

    componentDidUpdate(){
        let {autoHideDuration = 3000, afterClose, show} = this.props;
        if(show){
            this.timer = setTimeout(() => {
                this.timer && clearTimeout(this.timer)
                this.timer = null

                afterClose && afterClose();
            }, autoHideDuration);
        }
   
    }

    checkType() {
        var params = [].slice.call(arguments);
        var data = params[0];
        var types = params.slice(1);
        var _type = {}.toString.call(data).split(/\s|\]|\[/)[2].toLowerCase();
        return types.length ? types.some(function (type) {
            return _type.indexOf(type.toLowerCase());
        }) > -1 : _type;
    }

    handleTouch = e => {
        
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.nativeEvent.preventDefault();
        return false;
    }

    renderToast(){
        const props = this.props;
        const {className = "", icon = 'info', text, bgColor = 'rgba(51,51,51,.8)'} = props;
       
        return (
           
            <div className={`c-toast-root ${className}`} style={this.getData('rootStyle')(bgColor)}>
                <div className="icon">{this.getData('icon')(icon)}</div>
                <div className="text">{text}</div>
            </div>
           
        );
    }

    render() {
        const {show, className = ""}= this.props;
        return (
                <div className={`c-toast-wrapper ${className} ${show? "in": "out"}`}
                    onTouchMove={e => this.handleTouch(e)}
                    onTouchEnd={e => this.handleTouch(e)}
                >
                    {
                        this.renderToast()
                    }
                </div>
        )
    }

    getData(type) {
        return {
            'rootStyle': (bgColor) => ({
                background: bgColor
            }),
            'icon': icon => {
                if(!this.checkType(icon, 'string')){
                    return icon;
                }
                return {
                    'info': <i className="i-icon icon-info-circle"/>,
                    'success': <i className="i-icon icon-check-circle"/>,
                    'error': <i className="i-icon icon-error-circle"/>,
                    'loading': <i className="i-icon icon-loading"/>,
                }[icon]
            }
        }[type]
    }
}

export default Toast;