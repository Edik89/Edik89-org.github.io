import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import laptops from './laptopsAPI';
import tablets from './tabletsAPI';
import phones from './phonesAPI';
import card from './card';
import cardVisible from './CartVisible';

const rootReducer = combineReducers({
  laptops,
  tablets,
  card,
  phones,
  cardVisible,
  routing
});

export default rootReducer;
