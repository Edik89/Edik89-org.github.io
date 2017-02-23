import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import ModalShopCart from '../Card/ModalShopCart';
import Cart from '../Card/Cart';


export default class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="container">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Laptop shop</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <ModalShopCart />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="content">
          <Cart />
        </div>
      </div>
    );
  }
}

