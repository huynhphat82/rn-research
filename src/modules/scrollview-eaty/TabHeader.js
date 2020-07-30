import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import Animated from 'react-native-reanimated';

import {StyleSheet, ScrollView, Platform} from 'react-native';

import Tabs from './Tabs';

export default forwardRef((props, ref) => {
  const {tabs, y, transition, listSWRef} = props;
  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );
  const [indexCurrent, setIndexCurrent] = useState(0);
  const scrollViewRef = useRef(null);

  const PADDING_HORIZAL = 8;

  const tabsWidths = tabs.map(
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
          .scrollTo({x: tabsWidths[_index], animated: false});
      setIndexCurrent(_index);
    },
  }));

  const largeListScrollTo = (_index) => {
    const statusBarHeader = Platform.OS === 'ios' ? 6 : 50;
    listSWRef &&
      listSWRef.current
        .getNode()
        .scrollTo({y: tabs[_index].anchor + statusBarHeader, animated: true});
  };

  return (
    <Animated.View style={[styles.container, {opacity: transition}]}>
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
          onTab={(i, m) => {
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
    marginLeft: 0,
    marginRight: 0,
    height: 45,
    marginBottom: 2,
    flexDirection: 'row',
  },
});
