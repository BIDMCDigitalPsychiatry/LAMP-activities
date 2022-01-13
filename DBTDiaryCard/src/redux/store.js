import { createStore } from 'redux';
import reducers from './reducers'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistCombineReducers(persistConfig, {...reducers})

const store = createStore(
  persistedReducer 
);

export { store }; // , persistor };
