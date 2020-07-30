import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const EatyContentHeader = ({
  y,
  data,
  INSETS,
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  SCROLL_THRESHOLD_HEIGHT,
}) => {
  const top = STATUS_BAR_HEIGHT + INSETS.top;

  const getStars = (num, size = 22) => {
    return (
      <View style={styles.containerStar}>
        {new Array(num).fill(0).map((_, i) => (
          <Icon key={i} name="star" color="#f4c945" size={size} />
        ))}
      </View>
    );
  };

  const opacity = interpolate(y, {
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const translateY = interpolate(y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT - SCROLL_THRESHOLD_HEIGHT],
    extrapolate: 'clamp',
  });

  const translateX = interpolate(y, {
    inputRange: [0, 10],
    outputRange: [0, 8],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, {top, transform: [{translateY}]}]}>
      <Animated.Text style={[styles.title, {opacity, transform: [{translateX}]}]}>
        {data.name}
      </Animated.Text>
      <View style={styles.star}>{getStars(4)}</View>
      <Text style={styles.openTime}>Opens at {data.open_time}</Text>
      <Text style={styles.address}>{data.address}</Text>
    </Animated.View>
  );
};

export default EatyContentHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
  },
  star: {
    marginBottom: 10,
  },
  openTime: {
    fontSize: 15,
    marginBottom: 10,
  },
  address: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'justify',
  },
  containerStar: {
    flexDirection: 'row',
  },
});
