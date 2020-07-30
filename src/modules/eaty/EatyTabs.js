import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import EatyTab from './EatyTab';

export default ({tabs, onTab, onPress, indexCurrent}) => {
  return (
    <View style={styles.overlay}>
      {tabs.map((tab, index) => (
        <EatyTab
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
    flexDirection: 'row',
  },
});
