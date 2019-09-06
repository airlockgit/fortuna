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
        pay: false
    },
    forecast: {
      list: [],
      id: null,
    }
  };

export default initialState;
  