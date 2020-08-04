import {combineReducers} from 'redux';
import cartReducer from '../modules/cart/redux/Cart';

export const rootReducer = combineReducers({
  cartReducer,
});
