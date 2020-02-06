import { combineReducers } from 'redux';
import * as types from '../../actions/actionTypes';
import initialState from '../../store/initState';
import { profileReducer } from '../../reducers/profile';
import { userReducer } from '../../reducers/user';
import forecastReducer from '../../reducers/forecast';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'

export const forecastPersistConfig = {
  key: 'forecast',
  storage: storage,
}

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forecast: persistReducer(forecastPersistConfig, forecastReducer),
});

export const appReducers = (state, action) => {
  switch (action.type) {
    case types.RESET://сброс хранилища
      state = initialState;
      break;
  }
  return reducers(state, action);
};