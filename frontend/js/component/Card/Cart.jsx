import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Col, Button, Row, CardDeck } from 'reactstrap';

import { AddToCart, ChangeVisible } from '../../actions/Card';
import ImgForCart from '../common/ImgForCart';

const CardItem = ({ laptops, OnAddToCart, OnChangeVisible  }) => {

  CardItem.propTypes = {
    laptops: React.PropTypes.object.isRequired,
    OnAddToCart: React.PropTypes.func.isRequired,
    OnChangeVisible: React.PropTypes.func
  };

  const getCardId = (e) => {
    const target = e.target;
    const objItem = laptops.laptop.filter((obj) => {
      if(obj.id == target.id) return true;
    });

    OnAddToCart(objItem);
    OnChangeVisible({ id: target.id, status: true });

  };

  const cartChangeVisible = () => {
    let Button = laptops.CardVisible;

    if(Button.id) {

      let button = document.getElementById(Button.id);

      button.disabled = Button.status;
      button.innerHTML = Button.status ? "items in cart" : "Add to Cart";

    }

  };

  cartChangeVisible();

  const items = laptops.laptop;

  return (
    <Row>
      {
        items.map((val, key) => [
          <Card className="col-lg-4 col-md-5">
            <CardBlock>
              <CardTitle>{val.name}</CardTitle>
            </CardBlock>
            <ImgForCart url={val.img}/>
            <CardBlock>
              <CardText>{val.description}</CardText>
              <Button id={val.id} onClick={getCardId} disabled={false} color="primary" >
                Add to Cart
              </Button>
              <div className="price">price: {val.price} $</div>
            </CardBlock>
          </Card>
        ])
      }
    </Row>
  );

};

export default connect(
  state => ({
    laptops: state
  }),
  dispatch => ({
    OnAddToCart: (obj) => {
      dispatch(AddToCart(obj));
    },
    OnChangeVisible: (val) => {
      dispatch(ChangeVisible(val));
    }
  })
)(CardItem);
