import {createDrawerNavigator} from 'react-navigation-drawer';
import MainTabs from './MainTabs';
import Settings from './Settings';

const MainMenus = createDrawerNavigator({
  MainTabs,
  Settings,
});

export default MainMenus;
