import {createStackNavigator} from 'react-navigation-stack';
import R from '../routes';
import {SignUp, SignIn, SignOut} from '../modules/auth';

const Auth = createStackNavigator(
  {
    [R.SIGNIN]: SignIn,
    [R.SIGNUP]: SignUp,
    [R.SIGNOUT]: SignOut,
  },
  {
    initialRouteName: R.SIGNUP,
  },
);

export default Auth;
