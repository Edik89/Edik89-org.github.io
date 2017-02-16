import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Col, Button, Row, CardDeck } from 'reactstrap';

import { AddToCart } from '../../actions/Card';
import ModalShopCart  from './ModalShopCart';

class CardItem extends React.Component {

  static propTypes = {
    laptops: React.PropTypes.object.isRequired,
    OnAddToCart: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  getCardId(e) {
    const target = e.target;
    const objItem = this.props.laptops.laptop.filter((obj) => {
      if(obj.id == target.id) return true;
    });
    this.props.OnAddToCart(objItem);
  }

  render() {
    const items = this.props.laptops.laptop;
    return (
      <Row>
        {
          items.map((val, key) => [
            <Card className="col-lg-4 col-md-5">
              <CardBlock>
                <CardTitle>{val.name}</CardTitle>
              </CardBlock>
              <CardImg width="100%" src={"component/Card/img/"+val.img} alt="Card image cap" />
              <CardBlock>
                <CardText>{val.description}</CardText>
                <Button id={val.id} onClick={this.getCardId.bind(this)} color="primary" >
                 add to basket
                </Button>
                <div className="price">price: {val.price} $</div>
              </CardBlock>
            </Card>
          ])
        }
      </Row>
    );
  }

}

export default connect(
  state => ({
    laptops: state
  }),
  dispatch => ({
    OnAddToCart: (obj) => {
      dispatch(AddToCart(obj));
    }
  })
)(CardItem);
