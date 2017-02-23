import { CART_VISIBLE } from '../constants/StoreConst';

export default function CardVisible(state={ id: null, status: false }, action) {

  if(action.type === CART_VISIBLE) {

      return action.payload;

  }

  return state;
}
