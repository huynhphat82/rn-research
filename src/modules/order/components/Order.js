import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import R from '../../../routes';
import { useSafeArea } from 'react-native-safe-area-context';
import NavigationService from '../../../services/NavigationService';

const Order = ({navigation}) => {
  const INSETS = useSafeArea();
  return (
    <View style={{ top: INSETS.top }}>
      <TouchableOpacity onPress={() => {
        // NavigationService.navigate(R.ACCOUNT, { message: 'called from order via NavigationService.' })
        NavigationService.navigate(R.POLICY, { message: 'called from order via NavigationService.' })
        // navigation.navigate(R.ACCOUNT);
      }}>
        <Text>Go Account</Text>
      </TouchableOpacity>
      <Text>This is order screen.</Text>
    </View>
  );
};

export default Order;

// Order.navigationOptions = {
//   tabBarVisible: false,
// };
