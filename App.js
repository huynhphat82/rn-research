/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './src/stores';
import Cart from './src/modules/cart/containers/Cart';

const App = () => {
  return (
    <Provider {...{store}}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <Text>This is app</Text>
        <Cart />
      </PersistGate>
    </Provider>
  );
};

export default App;
