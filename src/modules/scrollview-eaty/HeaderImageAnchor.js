import React from 'react';
import {Dimensions, StyleSheet, View, Text, Platform} from 'react-native';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const {height: wHeight, width: wWidth} = Dimensions.get('window');

export const backgroundImage = require('./assets/background.jpeg');

export const HEADER_IMAGE_HEIGHT = wHeight / 2.5;
const PADDING = 16;

const HeaderImageAnchor = ({y, restaurant}) => {
  const opacity = interpolate(y, {
    inputRange: [1, 65],
    outputRange: [1, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const height = interpolate(y, {
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const top = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  const translateY = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [0, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const translateX = interpolate(y, {
    inputRange: [0, 10],
    outputRange: [0, PADDING / 2],
    extrapolate: Extrapolate.CLAMP,
  });

  const getStars = num => {
    return (
      <View style={{flexDirection: 'row'}}>
        {new Array(num).fill(0).map((_, i) => (
          <Icon
            key={i}
            name="star"
            color="#f4c945"
            size={22}
            style={styles.icon}
          />
        ))}
      </View>
    );
  };

  return (
    <Animated.View style={{ }}>
      <Animated.Image
        source={backgroundImage}
        style={[styles.image, {height, top}]}
      />
      <Animated.View
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'white',
          top: Platform.OS === 'ios' ? 100 : 50,
          left: 0,
          right: 0,
          justifyContent: 'space-between',
          marginHorizontal: 20,
          borderRadius: 20,
          padding: 15,
          transform: [
            {
              translateY: top
            }
          ]
        }}>
        <Animated.Text
          style={[
            { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'justify' },
            {
              transform: [{translateY}, {translateX}],
            },
            { opacity },
          ]}>
          {restaurant.name}
        </Animated.Text>
        <View style={{ marginBottom: 10 }}>
          {getStars(4)}
        </View>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>
          Opens at {restaurant.open_time}
        </Text>
        <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'justify' }}>
          {restaurant.address}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default HeaderImageAnchor;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: 'cover',
    height: HEADER_IMAGE_HEIGHT,
  },
});
