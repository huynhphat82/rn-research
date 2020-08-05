import React from 'react';
import {View, Text} from 'react-native';

const Policy = ({navigation}) => {
  return (
    <View>
      <Text>This is policy screen.</Text>
    </View>
  );
};

export default Policy;

Policy.navigationOptions = ({navigation}) => {
  console.log('navigation ====> ', navigation)
  return {
    headerBackImage: () => {
      return <View style={{ backgroundColor: 'red', height: 60 }} />
    },
  };
};
