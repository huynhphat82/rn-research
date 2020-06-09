import React from 'react';
import {SafeAreaView} from 'react-native';
import Middleware from '@app/middlewares/Middleware';
import Test from '@app/components/Test';

const App = () => {
  return (
    <>
      <SafeAreaView>
        <Middleware />
        <Test />
      </SafeAreaView>
    </>
  );
};

export default App;
