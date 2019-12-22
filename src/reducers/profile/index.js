import * as types from '../../actions/actionTypes';
import initialState from '../../store/initState';

export const profileReducer = (state = initialState.profile, action) => {
	let newState = state;

	switch (action.type) {
		case types.PROFILE_SET_WIDGET:
			newState = {
				...state,
				widget: action.widget
			}
			break;
		case types.PROFILE_SET_DONATIONALERTS:
			newState = {
				...state,
				donations: {
					donationalerts: action.options,
				}
			}
			break;
		case types.SET_USER:
			break;
		default:
			return state;
			break;
	}

	return newState;
};
