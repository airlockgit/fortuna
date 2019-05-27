import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, optionsReducer } from '../reducers/';

const initialState = {
  user: {
    id: '',
    email: '',
    token: '',
    auth: false,
    name: {
      value: '',
      error: false,
      message: ''
    }, 
    password: {
      value: '',
      error: false,
      message: ''
    },
    check: false,
    load: false,
    click_count: 0,
    click_count_max: 5,
    time: 0,//seconds
  },
  options: ''
};

const reducers = combineReducers({
  user: userReducer,
  options: optionsReducer
});

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk)
);
