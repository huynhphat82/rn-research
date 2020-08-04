/**
 * Logs all actions and states after they are dispatched.
 */
export const Logger = store => next => action => {
  console.group(action.type);
  console.log('[PrevState] => ', store.getState());
  console.info('[Action] => ', action);
  let result = next(action);
  console.log('[CurrentState] => ', store.getState());
  console.groupEnd();
  return result;
};
