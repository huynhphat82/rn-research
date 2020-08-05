import React from 'react';
import { View, Text } from 'react-native';

const HeaderBar = () => {
  return (
    <View style={{ 
      flex: 1,
      height: 60,
      width: '100%',
      backgroundColor: 'orange',
      justifyContent: 'center',
     }}>
      <Text>Title Title Title Title Title Title</Text>
    </View>
  );
};

export default HeaderBar;
