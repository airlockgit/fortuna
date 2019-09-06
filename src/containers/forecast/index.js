import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import { Link } from 'react-router-dom';
import * as profileActions from '../../actions/profile';
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
                {
                    !this.props.profile.widget ? null
                        : (
                            <>
                                <div className={styled.bord}>
                                    Редактирутйте предсказания:
                            </div>
                                <Todos placeholder='Новое предсказание' />
                                <Link to="/profile">
                                    <Button title="Назад" click={this._goBack} />
                                </Link>
                            </>
                        )
                }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);