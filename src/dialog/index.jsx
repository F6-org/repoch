// components
import './layer.style.scss';

import React from 'react';
import ReactDom from 'react-dom';

import Mask from '../mask/index.jsx';

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.dom = {}
        
        this.state = {
            style: {
            }
        }
    }

    // componentDidMount() {
    // }


    componentWillUnmount() {
        //clearTimeout(this.timer);
        //this.timer = null
        // window.removeEventListener('resize', this.handleResize.bind(this));
    }

    // componentDidMount() {
    //     window.addEventListener('resize', this.handleResize.bind(this));
    // }

    componentDidUpdate() {
        document.body.style.overflow = this.props.show ? 'hidden' : ""

        const dom = this.dom.content;
        
        if (this.props.show) {
            // $(dom).removeClass('transparent')
            dom.classList.remove('transparent')
        } else {
            // $(dom).addClass('transparent');
            dom.classList.add('transparent')
        }

    }


    handleTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
        e.nativeEvent.preventDefault()
    }

    onClose(e) {
        this.props.onClose && this.props.onClose()
    }

    render() {

        var {title, actions, children, className, show} = this.props

        return (
            <div className={`dialog-wrapper ${className}`}
                onTouchMove={e=> this.handleTouchMove(e)}
                // style={{ display: this.props.show ? "initial" : 'none' }}
                >
                {
                 
                }
                <div ref={ e => this.dom.content = e} className={`${show?'':'transparent'} dialog-content`}>
                    {React.Children.toArray(children)}
                </div>
                <Mask show={show}
                onClose={(e) => { this.onClose(e) } }
                />
            </div>
        );
    }
}

export default Dialog;
