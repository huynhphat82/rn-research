import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import Animated from 'react-native-reanimated';

import {StyleSheet, ScrollView} from 'react-native';

import Tabs from './Tabs';

export default forwardRef((props, ref) => {
  const {tabs, y, transition, scrollView} = props;
  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );
  const [indexCurrent, setIndexCurrent] = useState(0);
  const scrollViewRef = useRef(null);

  const PADDING_HORIZAL = 8;

  const tabsPoints = tabs.map(
    (_, i) =>
      measurements
        .filter((_, j) => j < i)
        .reduce((carry, item) => carry + item, 0) +
      PADDING_HORIZAL * i,
  );

  useImperativeHandle(ref, () => ({
    scrollTo(_index) {
      scrollViewRef &&
        scrollViewRef.current
          // .getNode() // if use Animated.ScrollView
          .scrollTo({x: tabsPoints[_index], animated: false});
      setIndexCurrent(_index);
    },
  }));

  const largeListScrollTo = (_index) => {
    scrollView &&
      scrollView.current
        .getNode()
        .scrollTo({y: tabs[_index].anchor + 1, animated: true});
  };

  return (
    <Animated.View style={[styles.container, {opacity: transition}, { marginRight: 8}]}>
      <ScrollView
        horizontal={true}
        scrollEventThrottle={16}
        style={{
          backgroundColor: 'orange',
          // flex: 1,
          ...StyleSheet.absoluteFillObject,
        }}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        <Tabs
          onMeasurement={(i, m) => {
            measurements[i] = m;
            setMeasurements([...measurements]);
          }}
          {...{tabs}}
          onPress={(i) => {
            largeListScrollTo(i);
            // ref.current.scrollTo(i);
          }}
          indexCurrent={indexCurrent}
        />
      </ScrollView>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: 'row',
  },
});
