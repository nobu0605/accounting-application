import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default function configureStore(): any {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const loggerMiddleware = createLogger();

  let enhancer = null;
  if (process.env.REACT_APP_ENV_NAME === 'production') {
    enhancer = applyMiddleware(thunkMiddleware);
  } else {
    enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware));
  }

  const store = createStore(rootReducer, enhancer);

  return store;
}
