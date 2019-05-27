import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import axios  from 'axios';
import { BtnLogin } from '../../components/btn';
import { setUser } from '../../actions';
import Preloader from '../../components/preloader';


class Authorization extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: {
        value: '',
        error: true,
        message: ''
      }, 
      password: {
        value: '',
        error: true,
        message: ''
      },
      check: false,
      load: false,
      click_count: 0,
      stop_time: 0,//seconds
    };

    this.click_count_max = 3;//default
  }

  _HandleBackHome = ()=> {
    this.props.history.push('/');
  }

  _HandleLogin = () => {
    this.setState({check: true});
    if(this.state.load) return;//ждем ответа
    if(!this.load('check')) return;//если было много попыток
    
    if(!this.state.password.error && !this.state.username.error){
      this.setState({load: true});//preloader
      axios.get('/users',{
        params: {
          username: this.state.username.value,
          password: this.state.password.value
        }
      })
        .then(response => {
          // handle success
          let data = response.data;

          console.log("Ответ сервера", data);
          if(data.success){
            console.log("Состояние юзера до", this.props.user);
            this.props.setUser(data.user);
            console.log("Состояние юзера после", this.props.user);
            //this.props.history.push('/profile');
          } else {
            if(data.error.username) {
              this.setState({username: {error: true, message: data.message}});//неверное имя
            }
  
            if(data.error.password) {
              let click_count = this.state.click_count + 1;

              this.setState({password: {error: true, message: data.message}});//неверный пароль
              this.setState({click_count});
            }
          }
          this.load('off');
        })
        .catch(error => {
          this.load('off');//preloader
          //console.log(error);
        })
    }
  }

  _onChangeInput = (e) => {
    const check = this.isChecked(e);

    this.setState({
        [e.target.name]: {
          value: e.target.value,
          error: check
        }
      });
  }

  isChecked(e) {
    if(e.target.value !== '') {//минимум проверки
      return false;
    } else {
      return true;
    }
  }

  isCheckedName(){
    return (this.state.check && this.state.username.error) ? '_error' : '_red';
  }

  isCheckedPass(){
    return (this.state.check && this.state.password.error) ? '_error' : '_red';
  }

  load(type){
    switch (type){
      case 'on': this.setState({load: true});
        break;
      case 'off': this.setState({load: false, time: 0});
          break;
      case 'check':
        if(this.state.click_count > this.click_count_max) {
          this.setState({load: true, time: 5, click_count: 0});
          return false;
        } else {
          return true;
        }
          break;
      default: this.setState({load: false});
    }
  }

  render() {
    const template = (
      <div className="authorization">
        <p className="authorization__description">Войдити, что бы получить доступ к личному кабинету</p>
        <div>
          <span className="authorization__alert-text">{this.state.username.message}</span>
          <input className={'input-default input-default' + this.isCheckedName()} type="text" value={this.state.username.value} name="username" onChange={this._onChangeInput} placeholder="Логин"/>
        </div>
        <div>
        <span className="authorization__alert-text">{this.state.password.message}</span>
          <input className={'input-default input-default' + this.isCheckedPass()} type="password" value={this.state.password.value} name="password" onChange={this._onChangeInput} placeholder="Пароль"/>
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
        {this.state.load
          ? <Preloader time={this.state.time} end={() => this.load('off')}/>
          : template
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.get('user')
});

const mapDispatchToProps = dispatch => ({
  setUser(user) {
		dispatch(setUser(user));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
