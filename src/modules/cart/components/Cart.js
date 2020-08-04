import React, { useEffect } from 'react';
import {View, Text} from 'react-native';

const Cart = ({ dataState, user, carts, getCartList }) => {
  useEffect(() => {
    console.log('user => ', user);
    console.log('carts => ', carts);
    getCartList();
  }, []);

  return (
    <View style={{ top: 80 }}>
      <Text>This is car screen</Text>
      <Text>{JSON.stringify(dataState)}</Text>
    </View>
  );
};

export default Cart;
