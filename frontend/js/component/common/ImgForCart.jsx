import React from 'react';
import { CardImg } from 'reactstrap';

const imgForCart = ( props ) => {

  imgForCart.propTypes = {
    url: React.PropTypes.string.isRequired
  };

  return <CardImg width="100%" src={"component/Card/img/"+props.url} alt="Card image cap" />;

};

export default imgForCart;
