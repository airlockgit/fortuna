import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { appReducers } from '../reducers/app';
import initialState from '../store/initState';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, appReducers);

export const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(thunk)
);
export const persistor = persistStore(store);
