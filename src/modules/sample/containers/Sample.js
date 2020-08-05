import {connect} from 'react-redux';
import Sample from '../components/Sample';
import {getSampleList} from '../redux/Sample';

const mapPropsToState = state => {
  const {user, samples} = state.sampleReducer;
  return {
    dataState: state,
    user,
    samples,
  };
};

const mapPropsToDispatch = dispatch => {
  return {
    getSampleList: () => dispatch(getSampleList()),
  };
};

export default connect(mapPropsToState, mapPropsToDispatch)(Sample);
