// components
import './layer.style.scss';

import React from 'react';
import ReactDom from 'react-dom';

import Mask from '../mask/index.jsx';

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
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

        let dom = this.refs.content;

        if (this.props.show) {
            // $(dom).removeClass('transparent')
            this.refs.content.remove('transparent')
        } else {
            // $(dom).addClass('transparent');
            this.refs.content.add('transparent')
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

        var {title, actions, children} = this.props

        return (
            <div ref="dialog-wrapper"
                className="dialog-wrapper"
                onTouchMove={e=> this.handleTouchMove(e)}
                // style={{ display: this.props.show ? "initial" : 'none' }}
                >
                {
                    <Mask show={this.props.show}
                        onClose={(e) => { this.onClose(e) } }
                        />
                }
                <div ref='content'
                    className="transparent dialog-content"
                    style={this.state.style}
                    >
                    {
                        !!title &&
                        <div className='title'>{title}</div>
                    }
                    <div className='content'>
                        {React.Children.toArray(children)}
                    </div>
                    <div className='actions clearfix'>
                        {React.Children.toArray(actions)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dialog;
