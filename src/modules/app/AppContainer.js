import React from 'react';
import Stored from './Stored';
import StatusBar from '../../components/organisms/StatusBar';
import AppNavigationContainer from '../../navigation';
import {NavigationService} from '../../services';

const AppContainer = () => {
  return (
    <Stored>
      <StatusBar />
      <AppNavigationContainer
        ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
      />
    </Stored>
  );
};

export default AppContainer;
