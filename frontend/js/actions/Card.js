import { CART_ADD, CART_DEL, CART_VISIBLE } from '../constants/StoreConst';

export const AddToCart = (obj) => dispatch => {
  dispatch({ type: CART_ADD, payload: obj });
};

export const DeleteFromCart = (obj) => dispatch => {

  dispatch({ type: CART_DEL, payload: obj });
};

export const ChangeVisible = (obj) => dispatch => {

  dispatch({ type: CART_VISIBLE, payload: obj });
};
