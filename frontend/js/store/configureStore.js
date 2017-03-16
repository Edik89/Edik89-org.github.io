import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../redusers/index';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
    initialState
  );
  /*module.hot.accept('../redusers', () => {
    const nextRootReducer = require('../redusers').default;
    store.replaceReducer(nextRootReducer);
  });*/
  return store;
}
