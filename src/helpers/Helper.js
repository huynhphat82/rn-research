import appConfig from '../config';

const Helper = {};

Helper.isFn = fn => typeof fn === 'function';

Helper.capitalize = (s) => {
  if (typeof s !== 'string') {
    throw new Error('Input must be a string!');
  }
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
};

Helper.getActiveRoute = (route) => {
  if (!route || typeof route !== 'object') {
    return null;
  }
  if (route.routes) {
    return Helper.getActiveRoute(route.routes[route.index]);
  }
  return route.routeName;
};

Helper.visibleTabBarScreens = (screens, props, hiddenTabBarScreens) => {
  let tabBarVisible = true;
  let activeRoute = Helper.getActiveRoute(props.navigation.state);
  if (
    (hiddenTabBarScreens || appConfig.hiddenTabBarScreens).includes(activeRoute) &&
    (screens || {}).hasOwnProperty(activeRoute)
  ) {
    tabBarVisible = false;
    // Hide TabBar for active screen
    let activeScreen = screens[activeRoute].screen || screens[activeRoute];
    activeScreen.navigationOptions = activeScreen.navigationOptions || {};
    activeScreen.navigationOptions.tabBarVisible = false;
  }
  return tabBarVisible;
};

Helper.checkHiddenTabBarScreens = (component, routes, hiddenTabBarScreens) => {
  component.navigationOptions = (props) => {
    return {
      tabBarVisible: Helper.visibleTabBarScreens(routes, props, hiddenTabBarScreens),
    };
  };
};

export default Helper;
