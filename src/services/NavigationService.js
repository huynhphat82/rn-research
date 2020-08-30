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

const getCurrentRoute = (route) => {
  if (!route || typeof route !== 'object') {
    return null;
  }
  if (route.routes) {
    return getCurrentRoute(route.routes[route.index]);
  }
  return route.routeName;
};

const existVar = (v) => {
  if (typeof v !== 'object') {
    throw new Error('Argument must be an object or a json');
  }
  let varName = Object.keys(v)[0];
  return v[varName] !== undefined ? {[varName]: v[varName]} : {};
};

const existArg = (args) => (Object.keys(args).length > 0 ? [args] : []);

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

NavigationService.goBack = function (key, immediate) {
  this.dispatch(
    NavigationActions.back(
      ...existArg({
        ...existVar({key}),
        ...existVar({immediate}),
      }),
    ),
  );
};

NavigationService.reset = function (index, actions = [], key = undefined) {
  this.dispatch(
    StackActions.reset({
      index,
      actions,
      ...existVar({key}),
    }),
  );
};

NavigationService.pop = function (n, immediate, prune, key) {
  this.dispatch(
    StackActions.pop(
      ...existArg({
        ...existVar({n}),
        ...existVar({immediate}),
        ...existVar({prune}),
        ...existVar({key}),
      }),
    ),
  );
};

NavigationService.popToTop = function (key, immediate) {
  this.dispatch(
    StackActions.popToTop(
      ...existArg({
        ...existVar({key}),
        ...existVar({immediate}),
      }),
    ),
  );
};

NavigationService.push = function (routeName, params, action, key) {
  this.dispatch(
    StackActions.push({
      routeName,
      ...existVar({params}),
      ...existVar({action}),
      ...existVar({key}),
    }),
  );
};

NavigationService.replace = function (routeName, params, action, key, newKey) {
  this.dispatch(
    StackActions.replace({
      routeName,
      ...existVar({params}),
      ...existVar({action}),
      ...existVar({key}),
      ...existVar({newKey}),
    }),
  );
};

NavigationService.completeTransition = function ({key, toChildKey}) {
  this.dispatch(
    StackActions.completeTransition(
      ...existArg({
        ...existVar({key}),
        ...existVar({toChildKey}),
      }),
    ),
  );
};

NavigationService.getCurrentRoute = function () {
  return this.navigator ? getCurrentRoute(this.navigator.state.nav) : null;
};

NavigationService.currentRoute = function () {
  return this.navigator ? getCurrentRoute(this.navigator.state.nav) : null;
};

NavigationService.visibleTabBarScreens = function (
  screens,
  props,
  hiddenTabBarScreens,
) {
  let tabBarVisible = true;
  let activeRoute = props ? getCurrentRoute(props.navigation.state) : this.getCurrentRoute();
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
