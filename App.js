import React from 'react';
import {View} from 'react-native';
import AppContainer from './src/navigation';
import NavigationService from './src/services/NavigationService';
import Helper from './src/helpers/Helper';
import Log from './src/helpers/Log';
import StatusBar from './src/components/organisms/StatusBar';

const App = () => {
  const handleNavigationChange = (prevState, currentState, action) => {
    let prevRouteName = Helper.getActiveRoute(prevState);
    let currentRouteName = Helper.getActiveRoute(currentState);
    if (prevRouteName !== currentRouteName) {
      Log.track('[Navigation][PrevRouteName] => ', prevRouteName);
      Log.track('[Navigation][CurrentRouteName] => ', currentRouteName);
      Log.track('[Navigation][Action] => ', action.type);
    }
  };

  return (
    <View style={{ flex: 1}}>
      <StatusBar />
      <AppContainer
        onNavigationStateChange={handleNavigationChange}
        ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
      />
    </View>
  );
};

export default App;
