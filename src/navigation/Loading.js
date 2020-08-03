import {createStackNavigator} from 'react-navigation-stack';
import Test from '../modules/test/Test';

const Loading = createStackNavigator(
  {
    Test,
  },
  {
    initialRouteName: 'Test',
  },
);

export default Loading;
