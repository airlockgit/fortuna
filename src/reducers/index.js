import * as types from '../actions/actionTypes';
import { Map } from 'immutable';

const init = Map({});

export const userReducer = (state = init, action) => {
	switch (action.type) {
		case types.SET_USER:
			return state.set('user', action.user);
		default:
			return state;
	}
};

export const optionsReducer = (state = init, action) => {
	switch (action.type) {
		case types.SET_USER:
			return state.set('user', action.user);
		default:
			return state;
	}
};
