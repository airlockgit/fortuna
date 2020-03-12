import React from 'react';
import { useSelector } from 'react-redux';
import styled from './forecast.module.scss';
import { useSubscribeStorage } from '../../hooks';

const ForecastLastMessage = () => {
    const { auth } = useSelector(
        state => state.user,
    );
    const { last_message = [] } = useSubscribeStorage('forecast');
    
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

export default ForecastLastMessage;