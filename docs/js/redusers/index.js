import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import laptop from './laptopsAPI';
import card from './card';
import CardVisible from './CartVisible';

export default combineReducers({
  laptop,
  card,
  CardVisible
});
