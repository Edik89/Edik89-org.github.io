import { CART_ADD, CART_DEL } from '../constants/StoreConst';

export default function card(state=[], action) {

  if(action.type === CART_ADD) {

    return [ ...state, action.payload ];

  } else if(action.type === CART_DEL) {

    Object.assign({}, state.splice(action.payload, 1) );

    return [ ...state ];

  }

  return state;

}
