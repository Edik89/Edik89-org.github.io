import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle,Button } from 'reactstrap';

import ImgForCart from '../common/ImgForCart';
import './style/ShopCart.scss';

const ShopCart = ({ OnRemoveFromShopCard, OnChangeVisible, GetCart }) => {

  ShopCart.propTypes = {
    GetCart: React.PropTypes.object.isRequired,
    OnRemoveFromShopCard: React.PropTypes.func,
    OnChangeVisible: React.PropTypes.func
  };

  const items = GetCart;

  const RemoveFromShopCard = (e) => {
    items.map((val, key1) => val.map((val, key2) => {
      if(val.id == e.target.id) {

        let id = e.target.id;

        OnRemoveFromShopCard(key1);
        OnChangeVisible({ [`${id}`]: false });
      }
    }));
  };

  if(items.length !== 0) {
    return (
      <div className="shop_card_container">
        {
          items.map((val, key) => val.map((val, key) => [
            <Card>
              <CardBlock>
                <CardTitle>{val.name}</CardTitle>
              </CardBlock>
              <ImgForCart url={val.img}/>
              <CardBlock>
                <div className="card-price">price: {val.price} $</div>
                <CardText>{val.description}</CardText>
              </CardBlock>
              <Button id={val.id} onClick={RemoveFromShopCard}>Delete</Button>
            </Card>
          ]))
        }
      </div>
    );
  } else {

    return <div>cart is empty!</div>;

    }
};

export default ShopCart;

