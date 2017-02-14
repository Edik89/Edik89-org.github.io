import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import { DeleteFromCart, ChangeVisible } from '../../actions/Card';

class ShopCart extends React.Component {

  static propTypes = {
    GetCart: React.PropTypes.object.isRequired,
    OnRemoveFromShopCard: React.PropTypes.func,
    OnChangeVisible: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  RemoveFromShopCard(e) {
    this.props.GetCart.card.map((val, key1) => val.map((val, key2) => {
      if(val.id == e.target.id) {
        let id = e.target.id;
        this.props.OnRemoveFromShopCard(key1);
        this.props.OnChangeVisible({ [id]: false});
      }
    }));
  }

  render() {
    const items = this.props.GetCart.card;
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
                <CardImg width="100%" src={"/component/Card/img/"+val.img} alt="Card image cap" />
                <CardBlock>
                  <CardText>{val.description}</CardText>
                </CardBlock>
                <Button id={val.id} onClick={this.RemoveFromShopCard.bind(this)}>Delete</Button>
              </Card>
            ]))
          }
        </div>
      );
    } else {
      return <div>cart is empty</div>;
    }
  }
}

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
