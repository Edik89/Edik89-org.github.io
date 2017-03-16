import React from 'react';
import { CardImg } from 'reactstrap';

const imgForCart = ( props ) => {

  imgForCart.propTypes = {
    url: React.PropTypes.string.isRequired
  };

  return <p className="fig"><CardImg  src={require(`img/${props.url}`)} alt="Card image cap" /></p>;

};

export default imgForCart;
