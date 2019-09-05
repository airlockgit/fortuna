import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    FORECAST_GET_DATA,
    LOADING,
} from '../../actions/actionTypes';
import axios from 'axios';

export const add = ({ text, checked = false }) => (
    async (dispath, getState) => {
        let response = await axios.get(`/forecast/users/${getState().user.id}`);

        let { data } = response;
        console.log('response', data);
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
                    user_id: getState().user.id,
                }
            });

            let { data } = response;

            dispath({
                type: FORECAST_GET_DATA,
                payload: data,
            })
        } catch (error) {
            //console.log('error /forecast/id', error);
        }
    }
);

export const Loading = () => ({
    type: LOADING,
})