import {createStackNavigator} from 'react-navigation-stack';
import {MainMenus} from './stacks';

const App = createStackNavigator(
  {
    MainMenus,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default App;
