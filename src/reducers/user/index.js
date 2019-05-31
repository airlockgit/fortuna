import * as types from '../../actions/actionTypes';
import initialState from '../../store/initState';

export const userReducer = (state = initialState.user, action) => {
	let newState;

	switch (action.type) {
		case types.SET_USER:
			newState = {...state, ...action.user};
			return newState;
		case types.SET_AUTH:
			newState = {
				...state,
				id: action.payload.user.id,
				token: action.payload.user.token,
				auth: action.payload.auth
			};
			return newState;
		default:
			return state;
	}
};