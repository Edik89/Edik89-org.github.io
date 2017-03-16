import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from './routes';

const store = configureStore();
const history = syncHistoryWithStore(createHistory(), store);

renderWithHotReload(Root);

if (module.hot) {
  module.hot.accept('./routes', () => {
  const NewRoot = require('./routes').default;
  renderWithHotReload(NewRoot);
  });
}

function renderWithHotReload(RootElement) {
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
}
