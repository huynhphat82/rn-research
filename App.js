import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

import PushNotificationService from './src/services/PushNotificationService';
import { RealtimeService } from './src/services/ProviderService';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    RealtimeService.onEaty((success, result) => {
      console.log('eaty => ', success, result);
    });
    RealtimeService.onUsers((success, result) => {
      console.log('users => ', success, result);
    });
    RealtimeService.onChats((success, result) => {
      console.log('chatss => ', success, result);
    });
    RealtimeService.onUsersBy(21, (success, result) => {
      console.log('usersBy => ', success, result);
    });
  }, []);

  useEffect(() => {
    // PushNotificationService.requestPermission();
    // PushNotificationService.getToken();
    // PushNotificationService.onNotificationForeground();
    // PushNotificationService.onNotificationBackground();
    // PushNotificationService.onNotificationQuit((success, remoreMessage, unsubscribe) => {
    //   setLoading(false);
    // });
  }, []);

  // if (loading) {
  //   return null;
  // }

  return (
    <SafeAreaView>
      <Text>See Your Changes</Text>
    </SafeAreaView>
  );
};

export default App;
