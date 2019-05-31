import * as types from '../actions/actionTypes';
import initialState from '../store/initState';

export const profileReducer = (state = initialState.profile, action) => {
	switch (action.type) {
		case types.SET_USER:
			return 'options';
		default:
			return state;
	}
};
