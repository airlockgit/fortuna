import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import { BtnLogin } from '../../components/btn';
import * as createActions from '../../actions';
import Preloader from '../../components/preloader';


class Authorization extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: {
        value: ''
      },
      password: {
        value: ''
      }
    };
  }

  _HandleBackHome = ()=> {
    this.props.history.push('/');
  }

  _HandleLogin = () => {
    this.props.setUserAsnc();
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
    console.log(e.target.value !== '');
    if(e.target.value !== '') {//минимум проверки
      return false;
    } else {
      return true;
    }
  }

  isCheckedName(){
    return (this.props.user.check && this.props.user.name.error) ? '_error' : '_red';
  }

  isCheckedPass(){
    return (this.props.user.check && this.props.user.password.error) ? '_error' : '_red';
  }

  load(type){
    switch (type){
      case 'check':
        if(this.state.click_count > this.click_count_max) {
          this.setState({load: true, time: 5, click_count: 0});
          return false;
        } else {
          return true;
        }
      default: this.setState({load: false});
    }
  }

  render() {
    const template = (
      <div className="authorization">
        <p className="authorization__description">Войдити, что бы получить доступ к личному кабинету</p>
        <div>
          <span className="authorization__alert-text">{this.props.user.name.message}</span>
          <input className={'input-default input-default' + this.isCheckedName()} type="text" value={this.props.user.name.value} name="name" onChange={this._onChangeInput} placeholder="Логин"/>
        </div>
        <div>
        <span className="authorization__alert-text">{this.props.user.password.message}</span>
          <input className={'input-default input-default' + this.isCheckedPass()} type="password" value={this.props.user.password.value} name="password" onChange={this._onChangeInput} placeholder="Пароль"/>
        </div>
        <BtnLogin className='btn-green' title="Назад" clickButton={this._HandleBackHome}/>
        <BtnLogin title="Войти" clickButton={this._HandleLogin}/>
      </div>
    );

    return (
      <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Авторизация</title>
        </Helmet>
        {this.props.user.load
          ? <Preloader time={this.props.user.time} end={() => this.load('off')}/>
          : template
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  setUserAsnc(user) {
		dispatch(createActions.setUserAsnc(user));
  },
  setUserData(name, password){
    dispatch(createActions.setUserData(name, password));
  },
  Loading(user) {
		dispatch(createActions.Loading(user));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
