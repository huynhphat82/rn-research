import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import Tabs from './Tabs';
import Animated, {
  interpolate,
  useCode,
  block,
  cond,
  greaterOrEq,
  and,
  lessThan,
  set,
} from 'react-native-reanimated';
import {useValues, withTransition} from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: 'row',
  },
});

export default ({tabs, y, transition, scrollView}) => {
  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );
  console.log('measurements => ', measurements)
  const [index] = useValues([0], [measurements]);
  const indexTransition = withTransition(index);
  const opacity = transition;
  const width = interpolate(indexTransition, {
    inputRange: tabs.map((_, i) => i),
    outputRange: measurements,
  });
  const translateX = interpolate(indexTransition, {
    inputRange: tabs.map((_, i) => i),
    outputRange: tabs.map((_, i) => {
      return (
        -1 *
          measurements
            .filter((_, j) => j < i)
            .reduce((carry, item) => carry + item, 0)
        - 8 * i
      );
    }),
  });

  const style = {
    borderRadius: 24,
    backgroundColor: 'black',
    // width: measurements[0],
    width,
    flex: 1,
  };

  useCode(
    () =>
      block(
        tabs.map((tab, i) =>
          cond(
            i === tabs.length - 1
              ? greaterOrEq(y, tab.anchor)
              : and(
                  greaterOrEq(y, tab.anchor),
                  lessThan(y, tabs[i + 1].anchor),
                ),
            set(index, i),
          ),
        ),
      ),
    [index, tabs, y],
  );
  
  return (
    <Animated.View style={[styles.container, {opacity}, { marginRight: 8}]}>
      <Animated.View 
        style={{ ...StyleSheet.absoluteFillObject, transform: [{translateX}] }}
      >
        <Tabs
          onMeasurement={(i, m) => {
            measurements[i] = m;
            setMeasurements([...measurements]);
          }}
          {...{tabs}}
        />
      </Animated.View>
      <View>
        <Animated.View {...{style}} />
      </View>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={<Animated.View {...{style}} />}
      >
        <Animated.View 
          style={{ ...StyleSheet.absoluteFillObject, transform: [{translateX}] }}
        >
          <Tabs
            active
            onPress={(i) => {
              if (scrollView.current) {
                scrollView.current
                  .getNode()
                  .scrollTo({ y: tabs[i].anchor + 1 });
              }
            }}
            {...{tabs}}
          />
        </Animated.View>
      </MaskedView>
    </Animated.View>
  );
};
