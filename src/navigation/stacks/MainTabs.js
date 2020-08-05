import {createBottomTabNavigator} from 'react-navigation-tabs';
import R from '../../routes';
import {Home} from '../../modules/home';
import {Cart} from '../../modules/cart';
import {Order} from '../../modules/order';
import Settings from './Settings';
import Helper from '../../helpers/Helper';

const routes = {
  [R.HOME]: Home,
  [R.CART]: Cart,
  [R.ORDER]: Order,
  [R.SETTING]: Settings,
};

const MainTabs = createBottomTabNavigator(routes, {
  initialRouteName: R.HOME,
});

Helper.checkHiddenTabBarScreens(MainTabs, routes);

export default MainTabs;
