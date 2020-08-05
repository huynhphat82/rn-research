import {combineReducers} from 'redux';
import sampleReducer from '@app/modules/sample/redux/Sample';

export const rootReducer = combineReducers({
  sampleReducer,
});
