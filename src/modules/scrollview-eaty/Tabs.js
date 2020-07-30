import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import Tab from './Tab';

export default ({tabs, onTab, onPress, indexCurrent}) => {
  return (
    <View style={styles.overlay}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          onTab={onTab ? onTab.bind(null, index) : undefined}
          onPress={onPress ? onPress.bind(null, index) : undefined}
          {...tab}
          active={indexCurrent == index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
});
