import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default ({title, onTab, onPress, active}) => {
  const activeBorderStyle = active ? styles.activeBorder : {};
  const activeColorStyle = active ? styles.activeColor : styles.normalColor;
  return (
    <TouchableOpacity {...{onPress}} activeOpacity={1}>
      <View
        onLayout={onTab ? ({nativeEvent: {layout: {width}}}) => onTab(width) : undefined}
        style={[styles.container, activeBorderStyle]}>
        <Text style={[styles.text, activeColorStyle]}>{title}</Text>
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
    fontWeight: 'bold',
  },
  normalColor: {
    color: 'black',
  },
});
