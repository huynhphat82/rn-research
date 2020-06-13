import React from 'react';
import {SafeAreaView} from 'react-native';
import Middleware from '@app/middlewares/Middleware';
import Test from '@app/components/Test';
import database from '@react-native-firebase/database';

const App = () => {
  database().ref('users/123').once('value', snap => console.log(snap.val()));
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
