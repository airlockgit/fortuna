import React, { Component, createRef } from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { random } from '../../common';
import { shake, rotateInUpRight, slideInUp } from 'react-animations';
import axios from 'axios';
import classNames from 'classnames';
import styled from './forecast.module.scss';
import Radium, { StyleRoot } from 'radium';
import { Link } from '@material-ui/core';
import rotateInDownLeft from 'react-animations/lib/rotate-in-down-left';
import { interval, timer } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { donationAlertsService } from '../../components/donations/donationalerts';
import { updateForecastMessage } from '../../actions/forecast';

const intervalTimeFromCast = 17000;//время отображения виджита - intervalTimeFromCastDelay
const intervalTimeFromCastDelay = 2000;//задержка перерд отображением виджита, для анимации

class ForecastView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            forecast: [],
        }

        this.turn = [];

        this.castText = createRef();
    }

    componentDidMount() {
        donationAlertsService.sub.subscribe({
            next: data => console.log('sub', data),
        });

        donationAlertsService.publish.subscribe({
            next: data => {
                console.log('pub', data);
                const { username, amount, message } = data;

                if (this.state.forecast.length < 1) return;//если нет предсказаний

                let cast = [];

                for (let i = 0; i < 5; i++) {
                    cast.push(username + ', ' + random(this.state.forecast).text);
                }

                this.turn.push({
                    cast,
                });
            }
        });

        axios.get('/forecast', {
            params: {
                token: 777,
            }
        })
            .then((res) => {
                this.setState({
                    forecast: res.data,
                })
            });

        /*interval(1000)
            .pipe(
                take(5)
            )
            .subscribe(() => {
                let cast = [];

                for (let i = 0; i < 5; i++) {
                    cast.push('Tut' + i + ', ' + random(this.state.forecast).text);
                }

                this.turn.push({
                    cast,
                });
                console.log('Добавили', this.turn);
            })*/

        let count = 1;

        interval(intervalTimeFromCast)
            .subscribe({
                next: () => {
                    console.log('update', this.turn);
                    this.props.updateForecastMessage({
                        name: 'Донатер ' + count,
                        text: 'Тебе повезет сегодня!',
                    });
                    count++;
                    this.setState({
                        alert: false,
                    });

                    console.log('Последнии предсказания', this.props.last_message);

                    timer(intervalTimeFromCastDelay)
                        .subscribe(() => {
                            this.setState({
                                alert: true,
                            });

                            this.turn.shift();
                        })
                },
            });
    }

    randomCast = () => {
        const { cast } = this.turn[0];

        interval(500)
            .pipe(
                take(cast.length),
            )
            .subscribe({
                next: () => {
                    if (this.castText.current) this.castText.current.innerHTML = random(cast);
                },
            });
    }

    render() {
        if (this.turn.length > 0 && this.state.alert) {
            let { alert } = this.turn[0];

            const styles = {
                bounce: {
                    animation: '1 1s',
                    animationName: Radium.keyframes(rotateInDownLeft, 'bounce')
                },
                unicorn: {
                    animation: '1 1s',
                    animationName: Radium.keyframes(rotateInUpRight, 'unicorn')
                },
            }

            this.randomCast();

            return (
                <div className={styled.container} >
                    <StyleRoot>
                        <div className={alert ? styled.box_win : styled.box}>
                            <div style={!alert ? null : styles.unicorn} className={styled.unicorn}></div>
                            <div style={!alert ? null : styles.bounce} className={styled.title} ref={this.castText}></div>
                        </div>
                    </StyleRoot>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = store => ({
    forecast: store.forecast.list,
    last_message: store.forecast.last_message,
});

const mapDispatchToProps = dispatch => ({
    updateForecastMessage(msg) {
        dispatch(updateForecastMessage(msg))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForecastView);