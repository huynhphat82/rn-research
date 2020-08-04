const GET_CART_LIST_SUCCESS = 'GET_CART_LIST_SUCCESS';

const actGetCartListSuccess = (payload) => ({
  type: GET_CART_LIST_SUCCESS,
  payload: payload,
});

export const getCartList = () => dispatch => {
  dispatch(actGetCartListSuccess([1, 2, 3, 4, 5]));
};

const initialState = {
  user: {
    name: 'Test',
    age: 20,
    sex: 0,
  },
  carts: [],
  device: 'iPhone',
  // messages: {},
};

const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_CART_LIST_SUCCESS:
      return {
        ...state,
        carts: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
