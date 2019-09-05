import * as types from '../../actions/actionTypes';
import initialState from '../../store/initState';

export const profileReducer = (state = initialState.profile, action) => {
	let newState;

	switch (action.type) {
		case types.PROFILE_SET_WIDGET:
				newState = {
					...state,
					widget: action.widget
				}
			return newState;
			break;
		case types.SET_USER:
			return 'options';
			break;
		default:
			return state;
	}
};
