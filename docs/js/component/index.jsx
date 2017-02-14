import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';


import Menu from './Menu/App';
import redusers from '../redusers/index';

const store = createStore(redusers, composeWithDevTools(applyMiddleware(thunk)));

//const history = syncHistoryWithStore(hashHistory, store)


export default ReactDOM.render(
  <Provider store={store}>
      <Menu />
  </Provider>,
  document.getElementById('root')
);
