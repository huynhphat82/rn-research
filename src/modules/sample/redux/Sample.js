const GET_SAMPLE_LIST_SUCCESS = 'GET_SAMPLE_LIST_SUCCESS';

const actGetSampleListSuccess = (payload) => ({
  type: GET_SAMPLE_LIST_SUCCESS,
  payload: payload,
});

export const getSampleList = () => dispatch => {
  dispatch(actGetSampleListSuccess([1, 2, 3, 4, 5]));
};

const initialState = {
  user: {
    name: 'Test',
    age: 20,
    sex: 0,
  },
  samples: [],
  device: 'iPhone',
};

const sampleReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_SAMPLE_LIST_SUCCESS:
      return {
        ...state,
        samples: payload,
      };
    default:
      return state;
  }
};

export default sampleReducer;
