import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { AddToCart, ChangeVisible, DeleteFromCart } from '../../actions/Card';
import TopMenu from './TopMenu';
import Cart from '../Card/Cart';

import './styles/index.scss';

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



class App extends Component {

 static propTypes = {
    laptops: React.PropTypes.array.isRequired,
    tablets: React.PropTypes.array.isRequired,
    phones: React.PropTypes.array.isRequired
  }

  render() {
    const newArr = [].concat(this.props.laptops, this.props.tablets, this.props.phones);
    return (
      <div>
        <div className="container">
          <TopMenu {...this.props} />
          <div className="content">
            <Route exact path="/" onEnter={checkForRedirect} render={()=> <Cart props={newArr} {...this.props} /> } />
            <Route path="/tablets" render={()=> <Cart props={this.props.tablets} {...this.props} /> } />
            <Route path="/laptops" render={()=> <Cart props={this.props.laptops} {...this.props} /> } />
            <Route path="/phones" render={()=> <Cart props={this.props.phones} {...this.props} /> } />
          </div>
        </div>
        <div className="bottom"></div>
      </div>
    );
  }
}

export default connect(
  state => ({
    laptops: state.laptops,
    tablets: state.tablets,
    phones: state.phones,
    cardVisible: state.cardVisible,
    GetCart: state.card
  }),
  dispatch => ({
    OnAddToCart: (obj) => {
      dispatch(AddToCart(obj));
    },
    OnChangeVisible: (val) => {
      dispatch(ChangeVisible(val));
    },
    OnRemoveFromShopCard: (getSate) => {
      dispatch(DeleteFromCart(getSate));
    }
  })
)(App);

