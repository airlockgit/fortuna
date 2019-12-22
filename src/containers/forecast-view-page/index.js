import React, { Component } from 'react';
import { AsyncSubject, Subject, Observable } from 'rxjs';
import { store } from '../../store';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { random } from '../../common';
import { stop } from '../../actions/forecast';
import { shake } from 'react-animations';
import axios from 'axios';
import classNames from 'classnames';
import styled from './forecast.module.scss';
import Radium, { StyleRoot } from 'radium';
import { Link } from '@material-ui/core';
import Centrifuge from "centrifuge";

const magic = ['Колдую...', 'Ждиииии плз', 'Видишь я занят все еще?', 'Ало че так мало задонатил?', 'давай спать...',
    'Сейчас сейчас...'];

const subject = new Subject();

const service = {
    join: new Subject(),
    subscribe: new Subject(),
}

const messageService = {
    publish: message => subject.next(message.data),
    join: message => service.join.next(message),
    subscribe: context => {
        //subject.next(context);
        let interval = setInterval(() => {
            //console.log('turn 2', turn);
            service.subscribe.next('alert');
            //if (turn.length > 5) clearInterval(interval);
        }, 2000);
    },
    getMessage: () => subject.asObservable(),
};

class ForecastView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cast: 'Ожидаю...',
            alert: false,
            forecast: [],
        }

        this.turn = [];
        this.DonationsSubscribe();
    }

    componentDidMount() {
        service.subscribe.subscribe({
            next: (v) => console.log(`observerA: ${v}`),
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

        setInterval(() => {
            if (this.turn.length > 0) {
                console.log('update', this.turn);
                this.setState({
                    alert: true,
                });

                setTimeout(() => {
                    this.turn.shift();

                    this.setState({
                        alert: true,
                    });
                }, 9000);
            }
        }, 10000);
    }

    DonationsSubscribe = () => {//только для donationalerts.com
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2M2Q5MzRkZDAyYzFlZTVhYjdjZmNiMmJkZmViNWQ3M2E5ODBkN2QyMDY2ZTEwNjQyNTU2YjFkNDk1MzFhZDJiMWM3N2NjNmQwYzcwY2ZiIn0.eyJhdWQiOiIyMzAiLCJqdGkiOiI4NjNkOTM0ZGQwMmMxZWU1YWI3Y2ZjYjJiZGZlYjVkNzNhOTgwZDdkMjA2NmUxMDY0MjU1NmIxZDQ5NTMxYWQyYjFjNzdjYzZkMGM3MGNmYiIsImlhdCI6MTU3NjgzOTA3NywibmJmIjoxNTc2ODM5MDc3LCJleHAiOjIyMDc5OTEwNzcsInN1YiI6IjEwMDQ5MzgiLCJzY29wZXMiOlsib2F1dGgtZG9uYXRpb24tc3Vic2NyaWJlIiwib2F1dGgtdXNlci1zaG93Iiwib2F1dGgtZG9uYXRpb24taW5kZXgiXX0.Dpsi70RYAWIoZHFNO4KLj2PGNG1ge0oZlGr2MB-t2IHeBMaoXLy70jN7qtK3RxPQ3F3qZJxaOspb66AcVWsOAJ7iO-Nej5geMDbcVbHXPIJHPYc-GGHVGcrSdg5AKoZ6vixREU4RoKgW9WAGDmIUllZGH3o1WmAPNYQBAU1u1sdQ__0K5bCW2fBhPpzzgc_vD2rYsj8tFneLz2WVNuEcn4INUIJRkbKZo3KCEbXrZ9DzIQ5MmY0k_A-0-YPqX9pPHVWyomH-u2gZYLZqTY-w2mYnLGgYgpweliUZupoYxTcwnrX2w7QkSKsoh7n49RD1C9TSAYNHnNGwVetkQ8v5PWsKITd9WYq79GkVXom1cdJkL8khUc0VHnJOb0dnh-b33sN2VvDa_3birr6WRq7Ezwu5TCjyEJUvFL17UZ5I3K05DGVEIIsJp2C6iwhwPZFiS-6AvVON5C4avBI35bUS-5NbsVxFdK6p7bbMrz9VK9ksYHzobR-xriZ-tvS27RigNqLe5SehicjIOvg6uj-j8GM9wYC1-7CjuVn-aO55uxFP3xxx0cmHMNCOOxXho7HRc3BsuJn6nGBMyRjpXe7ayTuBgePO6syH2ADw-CQ2FGMGON25BOLWPD9sr3g6kyknPkGURWo_-GZZF8olRsO4XiOkApk8qgPofnqs9dyLKSM';

        var centrifuge = new Centrifuge('wss://centrifugo.donationalerts.com/connection/websocket', {
            subscribeEndpoint: "https://www.donationalerts.com/api/v1/centrifuge/subscribe",
            subscribeHeaders: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });

        centrifuge.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzAifQ.dWMUp76BGZoqaylv-Idb239Izx2nsTPgGSvUmiFNyXI");

        var callbacks = {
            publish: (req) => {
                // See below description of message format
                if (this.state.forecast.length < 1) return;
                let turn = this.turn;
                let { username, amount, message } = req.data;
                console.log('publish', req);

                this.turn.push({
                    cast: username + ', ' + random(this.state.forecast).text,
                    alert: true,
                });
            },
            join: function (message) {
                // See below description of join message format
                console.log('join', message);
            },
            leave: function (message) {
                // See below description of leave message format
                console.log(message);
            },
            subscribe: (context) => {
                // See below description of subscribe callback context format

                subject.next(1);
                console.log('subscribe', context);
                /*let interval = setInterval(() => {

                    console.log('turn 2', turn);
                    console.log('alert');
                    if (turn.length > 5) clearInterval(interval);
                }, 2000);*/
            },
            error: function (errContext) {
                // See below description of subscribe error callback context format
                console.log(errContext);
            },
            unsubscribe: function (context) {
                // See below description of unsubscribe event callback context format
                console.log(context);
            }
        }

        centrifuge.subscribe('$alerts:donation_1004938', messageService);

        centrifuge.connect();
    }

    render() {
        if (this.turn.length > 0) {
            const { alert, cast } = this.turn[0];
            const styles = {
                bounce: {
                    animation: '3 3s',
                    animationName: Radium.keyframes(shake, 'bounce')
                }
            }

            return (
                <div className={styled.container} >
                    <StyleRoot>
                        <div style={!alert ? null : styles.bounce} className={alert ? styled.box_win : styled.box}>
                            <div className={styled.title}>
                                {cast}
                            </div>
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
});

export default connect(mapStateToProps)(ForecastView);