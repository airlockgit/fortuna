import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    FORECAST_GET_DATA,
    LOADING,
    FORECAST_SET_MESSAGE,
    FORECAST_RESET_MESSAGE,
} from '../../actions/actionTypes';
import axios from 'axios';

export const add = ({ text, checked = false }) => (
    async (dispath, getState) => {
        let response = await axios.get(`/forecast/users/${getState().user.id}`);

        let { data } = response;

        dispath({
            type: ADD_TODO,
            payload: {
                text,
                checked,
                id: data.id,
            }
        });
    }
);

export const update = ({ id, ...rest }) => ({
    type: UPDATE_TODO,
    payload: {
        id,
        ...rest,
    }
});

export const updateForecastMessage = (last_message) => (
    async (dispath, getState) => {
        let count = getState().forecast.last_message.length;//number of posts
        console.log('actions', count);

        if (count > 20) {
            return dispath({
                type: FORECAST_RESET_MESSAGE,
            })
                .then(() => (
                    dispath({
                        type: FORECAST_SET_MESSAGE,
                        payload: last_message,
                    })
                )
                );
        } else {
            return dispath({
                type: FORECAST_SET_MESSAGE,
                payload: last_message,
            })
        }
    }
);

export const del = (id) => ({
    type: DELETE_TODO,
    payload: {
        id,
    }
});

export const getForecast = () => (
    async (dispath, getState) => {
        try {
            let response = await axios.get('/forecast', {
                params: {
                    id: getState().user.id,
                }
            });

            let { data } = response;

            return dispath({
                type: FORECAST_GET_DATA,
                payload: data,
            })
        } catch (error) {
            //console.log('error /forecast/id', error);
        }
    }
);

export const start = () => ({
    type: 'START',
    start: true,
});

export const stop = () => ({
    type: 'START',
    start: false,
})

export const Loading = () => ({
    type: LOADING,
})