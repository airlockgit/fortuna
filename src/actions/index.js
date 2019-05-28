import * as types from '../actions/actionTypes';
import axios  from 'axios';

export const setUserAsnc = (history) => {//одна авторизация для каждого сеанса
    return (dispath, getState) => {
      const { load, click_count, click_count_max,
      name, password } = getState().user;

      //ожидание ответа, попытки ограничены, проверка на корректный пароль и логин
      if(load || name.error || password.error) return;
      if(click_count === click_count_max) {
        dispath(Loading(true, 5));
        return;
      }
      dispath(Loading(true));//preloader
      dispath(setUserCheck(true));//запрос авторизации

      return axios.get('/users',{
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
            history.push('/profile');
          } else {
            if(data.error.username) {//неверное имя
              dispath({
                type: types.SET_USER,
                user: {
                  name: {
                    value: name.value,
                    error: true,
                    message: data.message
                  },
                  password: {
                    error: false,
                    value: password.value,
                    message: '',
                  },
                  click_count: click_count + 1
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

export const Loading = (load, time) => {
  return dispath => {
    if(time === 0) {
      dispath(ClickCount(0));
    }
    dispath({
      type: types.SET_USER,
      user: {
        load,
        time
      }
    })
  }
};

export const ClickCount = (click_count) => ({
  type: types.SET_USER,
  user: {
    click_count: click_count
  }
});