import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Loading from './Loading';
import App from './App';
import Auth from './Auth';

const RootApp = createSwitchNavigator(
  {Loading, Auth, App},
  {initialRouteName: 'Loading'},
);

const AppContainer = createAppContainer(RootApp);

export default AppContainer;
