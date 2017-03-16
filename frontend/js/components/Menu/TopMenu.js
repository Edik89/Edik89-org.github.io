import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader, ModalFooter } from 'reactstrap';

import Price from '../common/GetPrice';

export default class TopMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      nestedModal: false,
      ModalBodyContent: null,
      ModalBodyByForm: null
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  async LoadComponent() {
    const { ModalBodyContent, ModalBodyByForm } = await import('../Card/ModalShopCart');
    this.setState({ ModalBodyContent, ModalBodyByForm, isOpen: !this.state.isOpen });
  }

  render() {
    const { ModalBodyContent, ModalBodyByForm } = this.state;
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
            <div className="top_link">
              <Link to="/" >Home</Link>
              <Link to="/laptops" >Laptops</Link>
              <Link to="/tablets" >Tablets</Link>
              <Link to="/phones" >Phones</Link>
            </div>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <div id="shopCart">
                  <Button onClick={this.LoadComponent.bind(this)}>Shop Cart</Button>
                  <Price />
                  <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}><Price /></ModalHeader>
                      { this.state.isOpen ? <ModalBodyContent {...this.props}/> : null }
                    <ModalFooter>
                      <Button color="success" onClick={this.toggleNested}>Bay</Button>
                      <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                        <ModalHeader><Price /></ModalHeader>
                          { this.state.isOpen ? <ModalBodyByForm/> : null }
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>All Done</Button>
                        </ModalFooter>
                      </Modal>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
