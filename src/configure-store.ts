import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { AppReducer } from './app';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AppState } from './app';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: AppState) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    AppReducer,
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        logger
      ),
    ),
  );

  return store;
}