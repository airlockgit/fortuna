const initialState = {
    user: {
      id: '',
      email: '',
      token: '',
      auth: false,
      name: {
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
      click_count_max: 5,
      time: 0,//seconds
    },
    profile: {
        widget: false,
        pay: false,
        donations: {
          donationalerts: {
            enable: false,
            access_token: null,
            refresh_token: null,
            token_type: 'Bearer',
            expires_in: null,
          }
        }
    },
    forecast: {
      list: [],
      id: null,
      last_message: [{
        name: '',
        text: 'Сегодня сообщений нет!',
      }],
    }
  };

export default initialState;
  