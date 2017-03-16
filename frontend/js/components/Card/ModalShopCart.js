import React from 'react';
import { ModalBody } from 'reactstrap';

import ShopCart from './ShopCart';
import BayForm from '../Forms/BayForm';

export const ModalBodyContent = (props) => {
  return <ModalBody><ShopCart {...props}/></ModalBody>;
};

export const ModalBodyByForm = () => {
  return <ModalBody><BayForm/></ModalBody>;
};

