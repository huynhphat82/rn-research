import React from 'react';
import {StatusBar} from 'react-native';
import Stored from './Stored';
import {Sample} from '@app/modules/sample';

const AppContainer = () => {
  return (
    <Stored>
      <StatusBar barStyle="dark-content" />
      <Sample />
    </Stored>
  );
};

export default AppContainer;
