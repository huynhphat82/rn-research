import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import Animated from 'react-native-reanimated';

import {StyleSheet, ScrollView} from 'react-native';

import EatyTabs from './EatyTabs';

export default forwardRef((props, ref) => {
  const {y, tabs, opacity, listSWRef} = props;
  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );
  const [indexCurrent, setIndexCurrent] = useState(0);
  const scrollViewRef = useRef(null);

  const HORIZONTAL_PADDING = 8;

  const widthsTabs = tabs.map(
    (_, i) =>
      measurements
        .filter((_, j) => j < i)
        .reduce((carry, item) => carry + item, 0) +
      HORIZONTAL_PADDING * i,
  );

  useImperativeHandle(ref, () => ({
    scrollTo(_index) {
      scrollViewRef &&
        scrollViewRef.current
          // .getNode() // if use Animated.ScrollView
          .scrollTo({x: widthsTabs[_index], animated: false});
      setIndexCurrent(_index);
    },
  }));

  const largeListScrollTo = (_index) => {
    listSWRef &&
      listSWRef.current
        // .getNode()
        .scrollTo({y: tabs[_index].anchor, x: 0}, true);
        // .scrollToIndexPath({section: tabs[_index].section, row: 0}, true);
  };

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <ScrollView
        horizontal={true}
        scrollEventThrottle={16}
        style={styles.tab}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        <EatyTabs
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
    height: 45,
    flexDirection: 'row',
  },
  tab: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'orange',
  },
});
