import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ShopCart from './ShopCart';
import Price from '../common/GetPrice';
import BayForm from '../Forms/BayForm';

export default class ModalShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  render() {
    return (
      <div id="shopCart">
        <Button color="danger" onClick={this.toggle}>Shop Cart</Button>
        <Price />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}><Price /></ModalHeader>
          <ModalBody>
           <ShopCart />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleNested}>Bay</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
              <ModalHeader><Price /></ModalHeader>
              <ModalBody id="md" ><BayForm /></ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>All Done</Button>
              </ModalFooter>
            </Modal>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}



