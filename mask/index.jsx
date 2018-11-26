import './index.scss';
// components
import React from 'react';
import ReactDom from 'react-dom';

class Mask extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.refs.mask.removeEventListener('touchmove', this.handleMove)
    }

    componentDidMount() {
        this.refs.mask.addEventListener('touchmove', this.handleMove)
    }

    componentDidUpdate() {
        document.body.style.overflow = this.props.show ? 'hidden' : ""
    }

    onClose(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onClose && this.props.onClose(e);
        const {
            onClick = () => {}
        } = this.props;
        onClick();
        return false
    }

 

    handleMove(e){
        e.stopPropagation();
        e.preventDefault();
    }

    handleTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.nativeEvent.preventDefault();
        return false;
    }

    render() {

        const {disableBackClose} = this.props

        return (
            <div ref="mask" className={"mask " + (this.props.show ? "in" : "out")}
                    onTouchMove={(e) => this.handleTouchMove(e)}
                    onClick={(e) => !disableBackClose && this.onClose(e)}
                 >
            </div>
        );
    }
}

export default Mask;
