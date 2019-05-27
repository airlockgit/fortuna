import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import { userReducer, optionsReducer } from '../reducers/';
import { Map } from 'immutable';

const initialState = Map({
  user: {
    id: '',
    email: '',
    username: 'Логин',
    password: 'Пароль',
    token: '',
    auth: false
  },
  options: ''
});

const reducers = combineReducers({
  user: userReducer,
  options: optionsReducer
});

export const store = createStore(
  userReducer,
  initialState,
  applyMiddleware(thunk)
);
