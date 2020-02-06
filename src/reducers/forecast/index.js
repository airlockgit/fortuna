import initialState from '../../store/initState';
import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    FORECAST_GET_DATA,
    LOADING,
    FORECAST_SET_MESSAGE,
    FORECAST_RESET_MESSAGE,
} from '../../actions/actionTypes';

const forecastReducer = (state = initialState.forecast, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                list: [...state.list, { ...action.payload }],
                id: action.payload.id,
            };
        case UPDATE_TODO:
            let list = state.list.map(todo => {
                if (todo.id === action.payload.id) {
                    todo = { ...todo, ...action.payload };
                }

                return todo;
            });

            return {
                ...state,
                list,
            };
        case DELETE_TODO:
            return {
                list: state.list.filter(todo => todo.id !== action.payload.id),
                id: state.id,
            };
        case FORECAST_GET_DATA:
            return {
                ...state,
                list: action.payload,
            };
        case FORECAST_SET_MESSAGE:
            return {
                ...state,
                last_message: [...state.last_message, { ...action.payload }],
            }
        case FORECAST_RESET_MESSAGE:
            return {
                ...state,
                last_message: initialState.forecast.last_message,
            }
        case LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        case 'START':
            console.log('reducers', state)
            return {
                ...state,
                start: action.start,
            };
        default:
            return state;
    }
}

export default forecastReducer;