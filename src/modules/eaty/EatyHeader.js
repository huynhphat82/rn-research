import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  interpolate,
  set,
  greaterThan,
  cond,
} from 'react-native-reanimated';

import EatyTabHeader from './EatyTabHeader';

const EatyHeader = forwardRef((props, ref) => {
  const {
    tabs,
    y,
    listSWRef,
    restaurant,
    INSETS,
    SCROLL_THRESHOLD_HEIGHT,
  } = props;

  const opacity = new Animated.Value(0);
  const scrollViewRef = useRef(null);

  const ICON_SIZE = 24;
  const paddingTop = INSETS.top;

  const backgroundColor = interpolate(y, {
    inputRange: [0, SCROLL_THRESHOLD_HEIGHT],
    outputRange: [Animated.color(0, 0, 0, 0), Animated.color(255, 255, 255, 1)],
    extrapolate: 'clamp',
  });

  useImperativeHandle(ref, () => ({
    scrollTo(index) {
      scrollViewRef && scrollViewRef.current.scrollTo(index);
    },
  }));

  return (
    <Animated.View style={[styles.container, {paddingTop, backgroundColor}]}>
      <Animated.Code
        exec={() =>
          set(opacity, cond(greaterThan(y, SCROLL_THRESHOLD_HEIGHT), 1, 0))
        }
      />
      {/* Header bar */}
      <View style={styles.header}>
        <Animated.View>
          <Icon name="arrow-back" size={ICON_SIZE} color="white" />
          <Animated.View style={{...StyleSheet.absoluteFillObject, opacity}}>
            <Icon name="arrow-back" size={ICON_SIZE} color="black" />
          </Animated.View>
        </Animated.View>
        {/* Restaurant name */}
        <Animated.Text numberOfLines={1} style={[styles.title, {opacity}]}>
          {restaurant.name}
        </Animated.Text>
        {/* Right side */}
        <View>
          <Icon name="heart" size={ICON_SIZE} color="white" />
          <Animated.View style={{...StyleSheet.absoluteFillObject, opacity}}>
            <Icon name="heart" size={ICON_SIZE} color="black" />
          </Animated.View>
        </View>
      </View>
      {/* Scrollable tab */}
      <EatyTabHeader {...{tabs, y, opacity, listSWRef}} ref={scrollViewRef} />
    </Animated.View>
  );
});

export default EatyHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginLeft: 8,
    flex: 1,
    fontWeight: 'bold',
  },
});
