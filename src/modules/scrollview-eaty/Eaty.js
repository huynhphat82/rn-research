import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

import HeaderImageAnchor from './HeaderImageAnchor';
import Header from './Header';
import List from './List';
import {data, restaurant} from './data';

const _defaultTabs = data.map(({title}) => ({title, anchor: 0}));

const Eaty = () => {
  const [tabs, setTabs] = useState(_defaultTabs);
  const y = new Animated.Value(0);
  const listSWRef = useRef(null);
  const headerSWRef = useRef(null);

  let isLocked = false;

  const scrollTo = (index) => {
    headerSWRef && headerSWRef.current.scrollTo(index);
  };

  const scrollHeaderTab = (_y) => {
    for (let i = 0; i < tabs.length; i++) {
      if (i === tabs.length - 1) {
        if (_y >= tabs[i].anchor && i === tabs.length - 1 && !isLocked) {
          isLocked = true;
          scrollTo(i);
          return false;
        }
      } else {
        if (
          _y >= tabs[i].anchor &&
          _y < tabs[i + 1].anchor &&
          !isLocked
        ) {
          isLocked = true;
          scrollTo(i);
          return false;
        }
      }
      isLocked = false;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderImageAnchor {...{y, restaurant}} />
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={16}
        onScroll={({nativeEvent: {contentOffset: {y: scrollY}}}) => {
          y.setValue(scrollY);
          if (scrollHeaderTab(scrollY) === false) {
            return false;
          }
        }}
        ref={listSWRef}>
        <List
          onTab={(index, tab) => {
            console.log('tabs => ', tabs)
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
      <Header {...{tabs, y, listSWRef, restaurant}} ref={headerSWRef} />
    </View>
  );
};

export default Eaty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
