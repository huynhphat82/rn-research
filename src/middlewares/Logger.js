import {Log} from '../services';

/**
 * Logs all actions and states after they are dispatched
 */
export const Logger = (store) => (next) => (action) => {
  Log.group(action.type);
  Log.track('[PrevState] => ', store.getState());
  Log.track('[Action] => ', action);
  let result = next(action);
  Log.track('[CurrentState] => ', store.getState());
  Log.groupEnd();
  return result;
};
