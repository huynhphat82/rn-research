import React from 'react';
import {View, StatusBar as NativeStatusBar, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {DeviceService} from '../../services';
import {Color} from '../../config';

const StatusBar = ({
  backgroundColor,
  barStyle,
  containerStyle,
  ...propsRest
}) => {
  return (
    <View style={[styles.container, containerStyle, {backgroundColor}]}>
      <NativeStatusBar {...{backgroundColor, barStyle}} {...propsRest} />
    </View>
  );
};

export default StatusBar;

StatusBar.props = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.string,
  containerStyle: PropTypes.object,
  propsRest: PropTypes.object,
};

StatusBar.defaultProps = {
  backgroundColor: Color.BLUE,
  barStyle: 'light-content', // dark-content | light-content
  containerStyle: {},
  propsRest: {},
};

const styles = StyleSheet.create({
  container: {
    height: DeviceService.StatusBarHeight,
  },
});
