import React from 'react';
import {Text, StatusBar} from 'react-native';
import Stored from './Stored';
import Cart from '../cart/containers/Cart';

const AppContainer = () => {
  return (
    <Stored>
      <StatusBar barStyle="dark-content" />
      <Text>This is app</Text>
      <Cart />
    </Stored>
  );
};

export default AppContainer;
