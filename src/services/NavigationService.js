import {NavigationActions, StackActions} from 'react-navigation';

const getNestedParams = (routeName, params = []) => {
  return routeName.split('/').reduce((carry, item, index) => {
    let _paramsScreen = params[index] ? params[index] : {};
    if (index === 0) {
      carry.screen = item;
      carry.params = {..._paramsScreen};
      return carry;
    }
    let p = null;
    for (let i=0; i <= index; i++) {
      if (i === 0) {
        p = carry.params;
        continue;
      }
      p.params && (p = p.params);
    }
    p.screen = item;
    p.params = {..._paramsScreen};
    return carry;
  }, {});
};

const getActiveRoute = (route) => {
  if (!route || typeof route !== 'object') {
    return null;
  }
  if (route.routes) {
    return getActiveRoute(route.routes[route.index]);
  }
  return route.routeName;
};

const NavigationService = {
  navigator: null,
};

NavigationService.dispatch = function (actions) {
  this.navigator && this.navigator.dispatch(actions);
};

NavigationService.setTopLevelNavigator = function (navigator) {
  this.navigator = navigator;
};

NavigationService.navigate = function (routeName, params = []) {
  if (typeof routeName !== 'string') {
    return false;
  }
  if (params && !Array.isArray(params) && typeof params === 'object') {
    params = [params];
  }
  let paramsNested = getNestedParams(routeName, params);
  this.dispatch(
    NavigationActions.navigate({
      routeName: paramsNested.screen,
      params: paramsNested.params,
    }),
  );
};

NavigationService.goBack = function (key) {
  this.dispatch(NavigationActions.back({key}));
};

NavigationService.reset = function (index, key, actions = []) {
  this.dispatch(StackActions.reset({index, key, actions}));
};

NavigationService.pop = function (n) {
  this.dispatch(StackActions.pop({n}));
};

NavigationService.popToTop = function (key, immediate) {
  this.dispatch(StackActions.popToTop({key, immediate}));
};

NavigationService.push = ({routeName, params, action, key}) => {
  this.dispatch(StackActions.push({routeName, params, action, key}));
};

NavigationService.replace = ({key, newKey, routeName, params, action}) => {
  this.dispatch(StackActions.replace({key, newKey, routeName, params, action}));
};

NavigationService.completeTransition = ({key, toChildKey}) => {
  this.dispatch(StackActions.completeTransition({key, toChildKey}));
};

NavigationService.getActiveRoute = function () {
  return this.navigator ? getActiveRoute(this.navigator.state.nav) : null;
};

NavigationService.visibleTabBarScreens = function (
  screens,
  props,
  hiddenTabBarScreens,
) {
  let tabBarVisible = true;
  let activeRoute = props ? getActiveRoute(props.navigation.state) : this.getActiveRoute();
  if (
    (hiddenTabBarScreens || []).includes(activeRoute) &&
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

NavigationService.checkHiddenTabBarScreens = function (component, routes, hiddenTabBarScreens) {
  component.navigationOptions = (props) => {
    return {
      tabBarVisible: this.visibleTabBarScreens(routes, props, hiddenTabBarScreens),
    };
  };
};

export default NavigationService;
