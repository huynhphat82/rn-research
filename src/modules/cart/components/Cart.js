import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import R from '../../../routes';
import NavigationService from '../../../services/NavigationService';

const Cart = ({navigation}) => {
  return (
    <View style={{ top: 44 }}>
      <TouchableOpacity onPress={() => {
        NavigationService.navigate(R.ORDER, { message: 'called from cart via NavigationService.' });
        // navigation.navigate(R.ORDER);
      }}>
        <Text>Go To Order</Text>
      </TouchableOpacity>
      <Text>This is cart screen.</Text>
    </View>
  );
};

export default Cart;
