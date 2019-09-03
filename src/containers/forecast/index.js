import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import { Link } from 'react-router-dom';
import * as createActions from '../../actions';
import * as profileActions from '../../actions/profile';
import Preloader from '../../components/preloader';
import axios from 'axios';
import styled from './forecast.module.scss';


class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forecast: [],
        }
    }

    async getCast() {
        let response = await axios.get('/forecast');
        let { data } = response;

        this.setState({ forecast: data })
    }

    componentDidMount() {
        this.getCast()
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
                            <div className={styled.bord}>
                                Редактирутйте предсказания:
                            </div>
                        )
                }
                <div>
                    {
                        this.state.forecast.map((cast, i) => (
                            <div key={i}>
                                <div>
                                    {cast.title} № {cast.id}
                                </div>
                                <div>
                                    {cast.text}
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    !this.props.profile.widget ? null
                        : (
                            <Button title="Назад" click={this._goBack} />
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = store => ({
    user: store.user,
    profile: store.profile
});

const mapDispatchToProps = dispatch => ({
    setWidget(widget) {
        dispatch(profileActions.setWidget(widget));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);