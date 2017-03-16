import { CART_VISIBLE } from '../constants/StoreConst';

export default function cardVisible(state=[], action) {

  if(action.type === CART_VISIBLE) {

      return [...state, action.payload];

  }

  return state;
}
