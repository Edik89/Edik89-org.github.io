import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import { DeleteFromCart, ChangeVisible } from '../../actions/Card';
import ImgForCart from '../common/ImgForCart';

const ShopCart = ({ OnRemoveFromShopCard, OnChangeVisible, GetCart }) => {

  ShopCart.propTypes = {
    GetCart: React.PropTypes.object.isRequired,
    OnRemoveFromShopCard: React.PropTypes.func,
    OnChangeVisible: React.PropTypes.func
  };

  const items = GetCart.card;

  const RemoveFromShopCard = (e) => {
    items.map((val, key1) => val.map((val, key2) => {
      if(val.id == e.target.id) {

        let id = e.target.id;

        OnRemoveFromShopCard(key1);
        OnChangeVisible({ id: id, status: false });
      }
    }));
  };

  if(items.length !== 0) {
    return (
      <div>
        {
          items.map((val, key) => val.map((val, key) => [
            <Card id={"conteiner_leptop_"+val.id}>
              <CardBlock>
                <CardTitle>{val.name}</CardTitle>
                <CardSubtitle></CardSubtitle>
              </CardBlock>
              <ImgForCart url={val.img}/>
              <CardBlock>
                <CardText>{val.description}</CardText>
              </CardBlock>
              <Button id={val.id} onClick={RemoveFromShopCard}>Delete</Button>
            </Card>
          ]))
        }
      </div>
    );
  } else {

    return <div>cart is empty</div>;

    }
};


export default connect(
  state => ({
    GetCart: state
  }),
  dispatch => ({
    OnRemoveFromShopCard: (getSate) => {
      dispatch(DeleteFromCart(getSate));
    },
    OnChangeVisible: (val) => {
      dispatch(ChangeVisible(val));
    }
  })
)(ShopCart);
