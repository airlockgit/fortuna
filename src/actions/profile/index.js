import * as types from '../../actions/actionTypes';

export const setWidget = (widget) => ({
  type: types.PROFILE_SET_WIDGET,
  widget
});

export const setDonationAlerts = (options) => ({
  type: types.PROFILE_SET_DONATIONALERTS,
  options,
});