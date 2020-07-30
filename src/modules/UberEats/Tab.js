import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default ({name, onMeasurement, onPress, active}) => {
  const activeBorderStyle = active ? styles.activeBorder : {};
  const activeColorStyle  = active ? styles.activeColor : styles.normalColor;
  return (
    <TouchableOpacity {...{onPress}} activeOpacity={1}>
      <View
        onLayout={onMeasurement ? ({nativeEvent: {layout: {width}}}) => onMeasurement(width) : undefined}
        style={[styles.container, activeBorderStyle]}>
        <Text style={[styles.text, activeColorStyle]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  text: {
    fontSize: 14,
  },
  activeBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  activeColor: {
    color: 'green',
  },
  normalColor: {
    color: 'black',
  },
});
