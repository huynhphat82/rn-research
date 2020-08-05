import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const Sample = ({dataState, user, samples, getSampleList}) => {
  useEffect(() => {
    getSampleList();
  }, []);

  return (
    <View>
      <Text>This is sample screen</Text>
      <Text>{'User: ' + JSON.stringify(user)}</Text>
      <Text>{'Samples: ' + JSON.stringify(samples)}</Text>
      <Text>{'State: ' + JSON.stringify(dataState)}</Text>
    </View>
  );
};

export default Sample;
