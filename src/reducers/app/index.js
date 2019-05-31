import { combineReducers } from 'redux';
import * as types from '../../actions/actionTypes';
import initialState from '../../store/initState';
import { profileReducer } from '../../reducers/';
import { userReducer} from '../../reducers/user';

const reducers = combineReducers({
    user: userReducer,
    profile: profileReducer
  });

export const appReducers = (state, action) => {
	switch (action.type) {
        case types.RESET://сброс хранилища
            state = initialState;
            break;
    }
    return reducers(state, action);
};