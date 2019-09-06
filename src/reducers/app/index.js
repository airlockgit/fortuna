import { combineReducers } from 'redux';
import * as types from '../../actions/actionTypes';
import initialState from '../../store/initState';
import { profileReducer } from '../../reducers/profile';
import { userReducer} from '../../reducers/user';
import forecastReducer from '../../reducers/forecast';

const reducers = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forecast: forecastReducer,
  });

export const appReducers = (state, action) => {
	switch (action.type) {
        case types.RESET://сброс хранилища
            state = initialState;
            break;
    }
    return reducers(state, action);
};