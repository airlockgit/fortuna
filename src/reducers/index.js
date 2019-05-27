import * as types from '../actions/actionTypes';

export const userReducer = (state = [], action) => {
	let newState;

	switch (action.type) {
		case types.SET_USER:
			newState = {...state, ...action.user};
			console.log("newState", newState);
			return newState;
		default:
			return state;
	}
};

export const optionsReducer = (state = [], action) => {
	switch (action.type) {
		case types.SET_USER:
			return 'options';
		default:
			return state;
	}
};
