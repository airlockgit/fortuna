import React, { useState, Component } from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { interval, fromEvent } from 'rxjs';
import styled from './forecast.module.scss';

class ForecastLastMessage extends Component {
    state = {
        last_message: this.props.last_message,
        auth: this.props.auth,
    }

    componentDidMount() {
        this.updateStorage();
    }

    updateStorage() {
        this.update = fromEvent(window, 'storage');
        console.clear();

        this.update.subscribe(store => {
            let serialisedState = store.storageArea.getItem('persist:forecast');
            let ser = JSON.parse(serialisedState);
            console.log('updateStorage', ser);
            let last_message = JSON.parse(ser.last_message);
            this.setState({ last_message })
        });
    }

    render() {
        let { auth, last_message } = this.state;

        return (
            <div className={styled.main}>
                <div className={styled.container}>
                    {
                        auth ? (
                            <>
                                <div className={styled.title}>Последние предсказания:</div>
                                {
                                    last_message.reverse().map((message, i) => (
                                        message.name != '' || last_message.lenght < 2 ?
                                            <div className={styled.message} key={i}>
                                                <div>{message.name}</div>
                                                {message.text}
                                            </div> : null
                                    ))
                                }
                            </>
                        )
                            : <div className={styled.title}>Авторизуйтесь!</div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    auth: store.user.auth,
    last_message: store.forecast.last_message,
});

export default connect(mapStateToProps)(ForecastLastMessage);