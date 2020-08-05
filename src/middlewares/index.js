import thunk from 'redux-thunk';
import {Logger} from './Logger';

export const middlewares = [
  Logger,
  thunk,
];
