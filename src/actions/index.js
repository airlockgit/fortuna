import * as types from '../actions/actionTypes';

export const setUser = (user) => ({
    type: types.SET_USER,
    user: user
  });