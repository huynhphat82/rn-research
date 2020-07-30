import React, { useRef } from 'react';
import { StyleSheet, Dimensions, Platform , View, Text, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ENTRIES } from './data';

const MyCarousel = () => {

  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
  let _carousel = useRef(null);

  const wp = percentage => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };

  const slideHeight = viewportHeight * 0.36;
  const slideWidth = wp(75);
  const itemHorizontalMargin = wp(2);

  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 2;

  const _renderItem = ({item, index}) => {
    return (
      <View style={{ 
        backgroundColor: 'orange',
        height: 200,
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
        <View
          style={{ 
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
            height: 100,
           }}
        >
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100 }}
            />
          </View>
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100  }}
            />
          </View>
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100 }}
            />
          </View>
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100 }}
            />
          </View>
        </View>

        <View
          style={{ 
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
            height: 100,
           }}
        >
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100 }}
            />
          </View>
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100  }}
            />
          </View>
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100 }}
            />
          </View>
          <View style={{ flex: 1/4  }}>
            <Image
              source={{ uri: item.illustration }}
              style={{ height: 100 }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Carousel
      layout="default"
      ref={c => { _carousel = c; }}
      data={ENTRIES}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
};

export default MyCarousel;