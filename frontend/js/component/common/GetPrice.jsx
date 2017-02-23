import React from 'react';
import { connect } from 'react-redux';

const Price = ({ price }) => {

  Price.propTypes = {
    price: React.PropTypes.array.isRequired
  };

  const returnTotalSum = () => {
    let totalSum = 0;
    price.map((val, key) => val.map((val, key) => {
      totalSum += val.price;
    }));
    return totalSum;
  };

  return <div className="price_top" >Total: <b>{returnTotalSum()}</b></div> ;

};

export default connect(
  state => ({
    price: state.card
  })
)(Price);
