import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
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
  options: ''
};

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  user: userReducer,
  options: optionsReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(thunk)
);
export const persistor = persistStore(store);
