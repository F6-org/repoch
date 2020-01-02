import React from 'react';
import styles from './loading.css';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="E_loading" style={{height: "15vh"}}>
                <div className="loading_cont W_tc">
                    <p className="E_MB10">
                        <i className="W_loading_big"></i>
                        <span className="loading_text">加载中...</span>
                    </p>
                </div>
            </div>
        );
    }
}
