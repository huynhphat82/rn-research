import {NavigationActions, StackActions} from 'react-navigation';
import {NavigationService} from '../../services';

/**
 * Action types will be allowed
 *
 * @var array
 */
const typesAllowed = [
  NavigationActions.NAVIGATE,
  StackActions.PUSH,
];

/**
 * Prevent navigating twice when double tap
 *
 * @param func getStateForAction
 * @return func
 */
const withPreventNavigateDoubleClick = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;
  let isSameRoute = state && typesAllowed.includes(type) && routeName === NavigationService.currentRoute();
  return isSameRoute ? state : getStateForAction(action, state);
};

export default withPreventNavigateDoubleClick;
