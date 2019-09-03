import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import classNames from 'classnames/bind';
import * as createActions from '../../actions';
import Preloader from '../../components/preloader';
import styled from './authorization.module.scss';

let cx = classNames.bind(styled);

class Authorization extends Component {///login
  constructor(props) {
    super(props);

    if (props.user.auth) props.history.push('/profile');///если авторизован

    this.state = {
      name: {
        value: ''
      },
      password: {
        value: ''
      }
    };
  }

  _HandleBackHome = () => {
    this.props.history.push('/');
  }

  _HandleLogin = () => {
    this.props.setUserAsnc(this.props.history);
  }

  _onChangeInput = (e) => {
    const check = this.isChecked(e);

    this.props.setUserData({
      [e.target.name]: {
        value: e.target.value,
        error: check
      }
    });
  }

  isChecked(e) {
    if (e.target.value !== '') {//минимум проверки
      return false;
    } else {
      return true;
    }
  }

  isCheckedName() {
    return this.props.user.check && this.props.user.name.error;
  }

  isCheckedPass() {
    return this.props.user.check && this.props.user.password.error;
  }

  template() {
    return (
      <div className={styled.section}>
        <p className={styled.description}>Войдити, что бы получить доступ к личному кабинету</p>
        <div>
          <span className={classNames(styled.alertText)}>{this.props.user.name.message || ''}</span>
          <input className={cx({
            inputDefault: true,
            inputDefault_error: this.isCheckedName(),
            inputDefault_red: !this.isCheckedName(),
          })} type="text" value={this.props.user.name.value} name="name" onChange={this._onChangeInput} placeholder="Логин" />
        </div>
        <div>
          <span className={classNames(styled.alertText)}>{this.props.user.password.message}</span>
          <input className={cx({
            inputDefault: true,
            inputDefault_error: this.isCheckedPass(),
            inputDefault_red: !this.isCheckedPass(),
          })} type="password" value={this.props.user.password.value} name="password" onChange={this._onChangeInput} placeholder="Пароль" />
        </div>
        <Button classes={{ button: styled.btnGreen }} title="Назад" click={this._HandleBackHome} />
        <Button title="Войти" click={this._HandleLogin} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Авторизация</title>
        </Helmet>
        {this.props.user.load
          ? <Preloader time={this.props.user.time} end={() => this.props.Loading(false, 0)} />
          : this.template()
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  setUserAsnc(history) {
    dispatch(createActions.setUserAsnc(history));
  },
  setUserData(name, password) {
    dispatch(createActions.setUserData(name, password));
  },
  Loading(load, time) {
    dispatch(createActions.Loading(load, time));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
