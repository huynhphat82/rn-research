import {connect} from 'react-redux';
import Cart from '../components/Cart';
import {getCartList} from '../redux/Cart';

const mapPropsToState = state => {
  const {user, carts} = state.cartReducer;
  return {
    dataState: state,
    user,
    carts,
  };
};

const mapPropsToDispatch = dispatch => {
  return {
    getCartList: () => dispatch(getCartList()),
  };
};

export default connect(mapPropsToState, mapPropsToDispatch)(Cart);
