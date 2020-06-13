// import devTools from 'remote-redux-devtools';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import RN_ENV from '../../config';

export default function configureStore() {
  const middleware = [];

  middleware.push(thunk);
  if (RN_ENV.LOGGER) {
    middleware.push(logger);
  }

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  return {store};
}
