import React, { Component } from 'react';
import { Card, CardText, CardBlock, CardLink,
  CardTitle, Col, Button, Row, CardDeck } from 'reactstrap';

import ImgForCart from '../common/ImgForCart';
import './style/cart.scss';

export default class CardItem extends Component {

  static propTypes = {
    props: React.PropTypes.array.isRequired,
    OnAddToCart: React.PropTypes.func.isRequired,
    OnChangeVisible: React.PropTypes.func,
    cardVisible: React.PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  getCardId(e) {
    const button_id = e.target.id.split('_')[1];

    const objItem = this.props.props.filter((obj) => {
      if(obj.id == button_id) return true;
    });

    this.props.OnAddToCart(objItem);
    this.props.OnChangeVisible({ [`${button_id}`]: true });

  }

  cartChangeVisible() {

    const ButtonStats = this.props.cardVisible;

    ButtonStats.map( (val, key) => {

      for(let id in val) {

        let button = document.getElementById(`button_${id}`);

        if(button) {
          button.disabled = val[id];
          button.innerHTML = val[id] ? "items in cart" : "Add to Cart";
          val[id] ? button.classList.add("button_not_active") : button.classList.remove("button_not_active");
        }
      }

    });

  }

  componentDidMount() {
    this.cartChangeVisible();
  }

  render() {
    this.cartChangeVisible();
    const items = this.props.props;
    return (
      <Row>
        { items.map((val, key) => [
            <div className="card-container col-sm-7 col-md-5 col-lg-3">
              <Card>
                <CardBlock>
                  <CardTitle>{val.name}</CardTitle>
                  <ImgForCart url={val.img}/>
                </CardBlock>
                <CardBlock>
                  <Button id={`button_${val.id}`}
                    onClick={this.getCardId.bind(this)}
                    disabled={false}
                  >
                    Add to Cart
                  </Button>
                  <div className="card-price">price: {val.price} $</div>
                    <CardText>{val.description}</CardText>
                </CardBlock>
              </Card>
            </div>
          ])}
      </Row>
    );
  }

}
