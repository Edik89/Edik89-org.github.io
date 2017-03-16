import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/Menu/App';

const routes = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={App}/>
      </Router>
    </Provider>
  );
};

routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default routes;
