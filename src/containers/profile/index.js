import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as createActions from '../../actions';
import * as profileActions from '../../actions/profile';
import Preloader from '../../components/preloader';

class Profile extends Component {
  constructor(props) {
    super(props);

    //donationalerts Система сбора донатов donationalerts
  }


  _outLogin = () => {
    this.props.ResetUser();
    window.location.href = '/login';
  }

  _donationalertsActivation = () => {
    const { donationalerts } = this.props.profile.donations;
    if (!donationalerts.enable) window.location.href = 'https://www.donationalerts.com/oauth/authorize?client_id=230&redirect_uri=http://localhost:3000/profile&response_type=code&scope=oauth-donation-subscribe oauth-user-show oauth-donation-index';
  }

  donationalertsSetOptions = () => {
    const { donationalerts } = this.props.profile.donations;
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code && !donationalerts.enable) {
      console.log(donationalerts);
      axios.get('/forecast/donations/token/', {
        params: {
          code,
        }
      })
        .then(res => {
          if (res.error) {
            console.log('Error get token Donation Alerts', res);
            return;
          }
          console.log('data', res.data);

          this.props.setDonationAlerts({
            enable: true,
            ...res.data,
          });
        });
    }
  }

  render() {
    this.donationalertsSetOptions();

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Личный кабинет - {this.props.user.name.value}</title>
        </Helmet>
        <div>
          Добро пожаловать {this.props.user.name.value}
        </div>
        <ul>
          <li>Доступные игры:</li>
          <li><Link to="/forecast">Предсказания</Link></li>
        </ul>
        <a onClick={this._donationalertsActivation}>Авторизация</a>
        <Button title="Выйти" click={this._outLogin} />
      </>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user,
  profile: store.profile
});

const mapDispatchToProps = dispatch => ({
  ResetUser() {
    dispatch(createActions.ResetUser());
  },
  setWidget(widget) {
    dispatch(profileActions.setWidget(widget));
  },
  setDonationAlerts(options) {
    dispatch(profileActions.setDonationAlerts(options));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);