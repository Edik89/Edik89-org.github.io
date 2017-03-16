import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/Menu/App';


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

const routes = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route onEnter={checkForRedirect} component={App}/>
      </Router>
    </Provider>
  );
};

routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default routes;
