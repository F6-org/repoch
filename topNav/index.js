import React  from 'react';
import styles from './index.scss';

export default class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            selected_index: 0,
            onChangeNav: () => null
        }
    }


    componentDidUpdate = () => {
        this.setContainerScrollLeft(this.props.selected_index);
    }

    buildMenuList = () => {
        return this.props.menuList.map((item, i) => {
            if (this.props.selected_index === i) {
                return <li className="m-cur" key={ i }><span>{ item.name }<em></em></span></li>;
            }

            return <li onClick={ this.handleItemClick.bind(this, i) } key={ i }><span>{ item.name }</span></li>;
        });
    }

    handleItemClick = (index, e) => {
        this.props.onChangeNav(index);
    }

    setContainerScrollLeft = (index) => {
        let allLi = this.refs.nav_container.querySelectorAll('li');
        let container_w = this.refs.nav_container.clientWidth;
        let w = 0;
        let originOffsetW = this.refs.nav_container.scrollLeft;
        let offsetW = 0;

        for (let i = 0, len = allLi.length; i < len; i++) {
            w += allLi[i].offsetWidth;
            if (i >= index) {
                break;
            }
        }

        offsetW = (w - container_w) + container_w / 3;
        offsetW = offsetW < 0 ? 0 : offsetW;

        this.doAnimation(originOffsetW, offsetW);
    }

    doAnimation = (originOffsetW, offsetW) => {
        let realOffset = offsetW - originOffsetW;
        let step = realOffset / 15;
        let that = this;
        let count = 0;

        function animateFunc() {
            count++;
            if (!that.refs.nav_container) { return; }

            that.refs.nav_container.scrollLeft += step;
            if (count < 15) {
                window.requestAnimationFrame(animateFunc);
            }
        }
        
        window.requestAnimationFrame(animateFunc);
    }

    render() {
        return (
            <div className="m-top-nav">
                <div className="m-box">
                    <div className="m-box-col nav-main">
                        <div className="scroll-box" ref="nav_container">
                            <ul className="E_f14" className="nav-item">
                                { this.buildMenuList() }
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

// export default withStyles(styles)(TopNav);
