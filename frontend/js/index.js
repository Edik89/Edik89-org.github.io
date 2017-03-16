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


function checkForRedirect(nextState, replace) {
  const location = nextState.location;
  if (location.query.redirect === 'true') {
    parseRedirectQuery(location.query, replace);
  } else if (location.pathname.split('/')[1] === gitHubRepoName) {
    redirectToDomain();
  }
}

function parseRedirectQuery(query, replace) {
  let redirectTo = {};

  if (typeof query.pathname === 'string' && query.pathname !== '') {
    redirectTo.pathname = query.pathname;
  }

  if (typeof query.query === 'string' && query.query !== '') {
    let queryObject = {};
    query.query.split('&').map(q => q.split('=')).forEach(arr => {
      queryObject[arr[0]] = arr.slice(1).join('=');
    });
    redirectTo.query = queryObject;
  }

  if (typeof query.hash === 'string' && query.hash !== '') {
    redirectTo.hash = `#${query.hash}`;
  }

  replace(redirectTo);
}

const gitHubRepoName = 'react-redux';
// The domain for your site
// SET THIS: e.g. http://subdomain.example.tld, or http://www.example.tld
const domain = 'https://edik89.github.io/react-redux/';
function redirectToDomain() {
  window.location.replace(domain);
}


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
