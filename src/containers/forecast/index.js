import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import { Link } from 'react-router-dom';
import * as profileActions from '../../actions/profile';
import * as forecastActions from '../../actions/forecast';
import Preloader from '../../components/preloader';
import Todos from '../../components/todos';
import styled from './forecast.module.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forecast: [],
        }
    }

    _goBack = () => {

    }

    _start = () => {
        this.props.start();
        console.log('start', this.props.forecast);
    }

    _switchWidget = () => {
        this.props.setWidget(!this.props.profile.widget);
    }

    render() {
        return (
            <div className={styled.container}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Предсказания</title>
                </Helmet>
                <div className={styled.switchWidgetButton} title="Переключить в режим виджета" onClick={this._switchWidget}></div>
                <div className={styled.switchWidgetEdit} title="Переключить в режим виджета"></div>
                <div className={styled.bord}>
                    Редактирутйте предсказания: {this.props.forecast.list.length}
                </div>
                <div>
                    <Todos classes={{ container: styled.forecast__container }} placeholder='Новое предсказание' />
                </div>
                <Link to="/profile">
                    <Button title="Назад" click={this._goBack} />
                </Link>
                <Button title="Старт" click={this._start} />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    user: store.user,
    profile: store.profile,
    forecast: store.forecast,
});

const mapDispatchToProps = dispatch => ({
    setWidget(widget) {
        dispatch(profileActions.setWidget(widget));
    },
    start() {
        dispatch(forecastActions.start())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);