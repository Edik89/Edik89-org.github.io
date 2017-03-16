import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { AddToCart, ChangeVisible, DeleteFromCart } from '../../actions/Card';
import TopMenu from './TopMenu';
import Cart from '../Card/Cart';

import './styles/index.scss';

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
            <Route exact render={()=> <Cart props={newArr} {...this.props} /> } />
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

