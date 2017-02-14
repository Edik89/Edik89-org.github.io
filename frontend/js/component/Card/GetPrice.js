import React from 'react';
import { connect } from 'react-redux';

class Price extends React.Component {

  static propTypes = {
    price: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  returnTotalSum() {
    let totalSum = 0;
    this.props.price.map((val, key) => val.map((val, key) => {
      totalSum += val.price;
    }));
    return totalSum;
  }

  render() {

    return (
      <div className="price_top" >Total: <b>{this.returnTotalSum()}</b></div>
    );
  }

}

export default connect(
  state => ({
    price: state.card
  })
)(Price);
