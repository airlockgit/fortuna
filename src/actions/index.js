import * as types from '../actions/actionTypes';
import axios  from 'axios';

export const setUserAsnc = () => {//одна авторизация для каждого сеанса
    return (dispath, getState) => {
      const { load, click_count, click_count_max,
      name, password } = getState().user;

      //ожидание ответа, попытки ограничены, проверка на корректный пароль и логин
      if(load || (click_count === click_count_max) || (name.error && password.error)) return;
      dispath(Loading(true));//preloader
      dispath(setUserCheck(true));//запрос авторизации

      axios.get('/users',{
        params: {
          username: name.value,
          password: password.value
        }
      })
        .then(response => {
          let { data } = response;

          console.log("Ответ сервера", data, data.success);
          if(data.success){
            const { user, auth } = data;
            console.log("Состояние юзера до", getState().user);
            dispath({
              type: types.SET_USER,
              user: {
                id: user.id,
                auth: auth,
                token: user.token
              }
            });
            console.log("Состояние юзера после", getState().user);
            //this.props.history.push('/profile');
          } else {
            if(data.error.username) {//неверное имя
              dispath({
                type: types.SET_USER,
                user: {
                  name: {
                    value: name.value,
                    error: true,
                    message: data.message
                  }
                }
              });
            }
  
            if(data.error.password) {
              dispath({
                type: types.SET_USER,
                user: {
                  password: {
                    value: password.value,
                    error: true,
                    message: data.message
                  },
                  click_count: click_count + 1
                }
              });//неверный пароль
            }
          }
          dispath(Loading(false));//preloader
        })
        .catch(error => {
          dispath(Loading(false));//preloader
          //console.log(error);//modal
        })
    }
  };

export const setUserCheck = check => ({
  type: types.SET_USER,
  user: {
    check
  }
});

export const setUserData = (user) => ({
  type: types.SET_USER,
  user
});

export const Loading = (load, time) => ({
  type: types.SET_USER,
  user: {
    load,
    time
  }
});