import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory as createHistory } from 'history'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import reducers from './reducers'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const history = createHistory();
const routeMiddleware = routerMiddleware(history)

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistCombineReducers(persistConfig, {...reducers, router: routerReducer})

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(routeMiddleware))
);

let persistor = persistStore(store)

export { store, history, persistor };
