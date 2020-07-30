import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {LargeList} from 'react-native-largelist-v3';
import Animated from 'react-native-reanimated';
import {useSafeArea} from 'react-native-safe-area-context';

import {data, restaurant} from './data';
import EatyHeader from './EatyHeader';
import EatyContentHeader from './EatyContentHeader';

const imageBG = require('./assets/background.jpeg');
const {height: hScreen} = Dimensions.get('window');

const _getTabs = (data, anchor = 0, hItem = 0, hSection = 0, extraAnchor = 0) => {
  return data.map(({title}, index) => {
    if (index > 0) {
      anchor += data[index].items.length * hItem + hSection;
    }
    return {
      title,
      anchor: anchor - extraAnchor,
      section: index,
    };
  });
};

const _getImageSource = (image) => {
  switch (image) {
    case 'milktea1.png':
      return require('./assets/milktea1.jpg');
    case 'milktea2.png':
      return require('./assets/milktea2.png');
    case 'milktea3.png':
      return require('./assets/milktea3.jpg');
    case 'milktea4.png':
      return require('./assets/milktea4.png');
    case 'milktea5.png':
      return require('./assets/milktea5.png');
    default:
      return require('./assets/milktea1.jpg');
  }
};

const EatyLargeList = () => {
  const INSETS = useSafeArea();
  const y = new Animated.Value(0);
  const listSWRef = useRef(null);
  const headerSWRef = useRef(null);

  const HEADER_IMAGE_HEIGHT = hScreen / 2.5;
  const STATUS_BAR_HEIGHT = 45;
  const HEADER_TAB_HEIGHT = 45;

  const SECTION_HEIGHT = 40;
  const ITEM_HEIGHT = 150;
  const INITIAL_OFFSET = {x: 0, y: 1000};

  const RABBIT_EAR = INSETS.top;
  const HEADER_HEIGHT = HEADER_IMAGE_HEIGHT - RABBIT_EAR;
  const SCROLL_THRESHOLD_HEIGHT = HEADER_HEIGHT.toFixed(0) - STATUS_BAR_HEIGHT - HEADER_TAB_HEIGHT - RABBIT_EAR;
  const extraAnchor = STATUS_BAR_HEIGHT + HEADER_TAB_HEIGHT + RABBIT_EAR;
  const tabs = _getTabs(data, HEADER_HEIGHT, ITEM_HEIGHT, SECTION_HEIGHT, extraAnchor);

  let isLocked = false;

  const scrollTo = (index) => {
    headerSWRef && headerSWRef.current.scrollTo(index);
  };

  const scrollHeaderTab = (_y) => {
    for (let i = 0; i < tabs.length; i++) {
      if (i === tabs.length - 1) {
        if (
          _y >= tabs[i].anchor - 0.1 &&
          i === tabs.length - 1 &&
          !isLocked
        ) {
          isLocked = true;
          scrollTo(i);
          return false;
        }
      } else {
        if (
          _y >= tabs[i].anchor - 0.1 &&
          _y < tabs[i + 1].anchor - 0.1 &&
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

  const _renderHeader = () => {
    return <View style={{height: HEADER_HEIGHT}} />;
  };

  const _renderHeaderBackground = () => {
    return <ImageBackground source={imageBG} style={{height: HEADER_HEIGHT}} />;
  };

  const _renderFooter = () => {
    return <View />;
  };

  const _renderSection = (section) => {
    return (
      <TouchableOpacity style={styles.section} activeOpacity={1}>
        <Text style={styles.titleSection}>{data[section].title}</Text>
      </TouchableOpacity>
    );
  };

  const _renderItem = ({section, row}) => {
    const item = data[section].items[row];
    return (
      <View style={styles.containerItem}>
        <TouchableOpacity style={styles.contentItem}>
          <ImageBackground
            source={_getImageSource(item.image)}
            style={styles.imageItem}
          />
          <View style={styles.rightContentItem}>
            <Text style={styles.titleItem}>{item.title}</Text>
            <Text style={styles.descriptionItem}>{item.description}</Text>
            <View style={styles.containerPriceItem}>
              <Text style={styles.priceItem}>{item.price}</Text>
              <TouchableOpacity activeOpacity={1} style={styles.addBtnItem}>
                <Text style={styles.addIconItem}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.dash} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LargeList
        ref={listSWRef}
        data={data}
        headerStickyEnabled={false}
        initialContentOffset={INITIAL_OFFSET}
        heightForSection={() => SECTION_HEIGHT}
        heightForIndexPath={() => ITEM_HEIGHT}
        renderSection={_renderSection}
        renderIndexPath={_renderItem}
        renderHeader={_renderHeader}
        renderFooter={_renderFooter}
        renderScaleHeaderBackground={_renderHeaderBackground}
        onScroll={({nativeEvent: {contentOffset: {y: scrollY}}}) => {
          y.setValue(scrollY);
          if (scrollHeaderTab(scrollY) === false) {
            return false;
          }
        }}
      />
      <EatyHeader
        {...{
          tabs,
          y,
          listSWRef,
          restaurant,
          INSETS,
          HEADER_HEIGHT,
          STATUS_BAR_HEIGHT,
          SCROLL_THRESHOLD_HEIGHT,
        }}
        ref={headerSWRef}
      />
      <EatyContentHeader
        {...{
          y,
          INSETS,
          HEADER_HEIGHT,
          STATUS_BAR_HEIGHT,
          SCROLL_THRESHOLD_HEIGHT,
          data: restaurant,
        }}
      />
    </View>
  );
};

export default EatyLargeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    backgroundColor: '#EEE',
    justifyContent: 'center',
  },
  titleSection: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  dash: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'grey',
  },

  containerItem: {
    flex: 1,
    justifyContent: 'center',
  },
  contentItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageItem: {
    marginHorizontal: 16,
    width: 60,
    height: 60,
  },
  titleItem: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionItem: {
    fontSize: 15,
    paddingVertical: 5,
  },
  rightContentItem: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  containerPriceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceItem: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  addBtnItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconItem: {
    textAlign: 'center',
    backgroundColor: 'blue',
    borderRadius: 25 / 2,
    height: 25,
    width: 25,
    fontSize: 16,
    color: 'white',
  },
});
