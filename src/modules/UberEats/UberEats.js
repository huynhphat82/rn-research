import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import HeaderImage from './HeaderImage';
import Content, {defaultTabs} from './Content';
import Header from './Header';
import Animated from 'react-native-reanimated';
import {useValues, onScrollEvent} from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const UberEats = () => {
  const [tabs, setTabs] = useState(defaultTabs);
  // const [y] = useValues([0], []);
  const y = new Animated.Value(0);
  const scrollView = useRef(null);

  const scrollViewRef = useRef(null);
  let isLocked = false;

  const scrollTo = (index) => {
    scrollViewRef && scrollViewRef.current.scrollTo(index);
  };

  return (
    <View style={styles.container}>
      <HeaderImage {...{y}} />
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        // onScroll={onScrollEvent({y})}
        onScroll={({nativeEvent}) => {
          let _y = nativeEvent.contentOffset.y;
          y.setValue(_y);
          for (let i=0; i < tabs.length; i++) {
            if (i === tabs.length - 1) {
              if (_y >= tabs[i].anchor && i === tabs.length - 1 && !isLocked) {
                isLocked = true;
                scrollTo(i);
                return false;
              }
            } else {
              if (_y >= tabs[i].anchor && _y < tabs[i + 1].anchor && !isLocked) {
                isLocked = true;
                scrollTo(i);
                return false;
              }
            }
            isLocked = false;
          }
          // tabs.map((tab, index) => {
          //   if (index === tabs.length - 1) {
          //     if (_y >= tab.anchor) {
          //       // if (!isLocked) {
          //         // isLocked = true;
          //         console.log('current tab 1 => ', index)
          //         scrollTo(index);
          //         // scrollViewRef.current && scrollViewRef.current.getNode().scrollTo({ x: tabsPoints[index] });
          //         // setIndexCurrent(index);
          //       // }
          //     }
          //     // else {
          //     //   isLocked = true;
          //     // }
          //   } else {
          //     // isLocked = false;
          //     if (_y >= tab.anchor && _y < tabs[index + 1].anchor) {
          //       // if (!isLocked) {
          //         isLocked = true;
          //         console.log('current tab 2 => ', index)
          //         scrollTo(index);
          //         // scrollViewRef.current && scrollViewRef.current.getNode().scrollTo({ x: tabsPoints[index] });
          //         // setIndexCurrent(index);
          //       // }
          //     }
          //     // else {
          //     //   isLocked = false;
          //     // }
          //   }
          // });
        }}
        ref={scrollView}
      >
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
      <Header {...{tabs, y, scrollView}} ref={scrollViewRef} />
    </View>
  );
};

export default UberEats;
