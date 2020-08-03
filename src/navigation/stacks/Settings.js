import {createStackNavigator} from 'react-navigation-stack';
import R from '../../routes';
import {Account, Policy} from '../../modules/setting';
import Helper from '../../helpers/Helper';

const routes = {
  [R.ACCOUNT]: Account,
  [R.POLICY]: Policy,
};

const Settings = createStackNavigator(routes, {
  initialRouteName: R.ACCOUNT,
});

Helper.checkHiddenTabBarScreens(Settings, routes);

export default Settings;
