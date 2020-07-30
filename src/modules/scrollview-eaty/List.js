import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {HEADER_IMAGE_HEIGHT} from './HeaderImageAnchor';
import {MIN_HEADER_HEIGHT} from './Header';
import {data} from './data';

const {height: hScreen} = Dimensions.get('window');
const HEADER_HEIGHT = hScreen / 2.5;

const List = ({onTab}) => {
  const onLayout = (index, title) => ({nativeEvent}) => {
    return onTab(index, {
      title,
      anchor: nativeEvent.layout.y - 142,
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

  return (
    <>
      <View style={{marginTop: HEADER_HEIGHT}} />
      {data.map(({title, items}, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={onLayout(index, title)}>
          <View style={styles.containerTitleSection}>
            <Text style={styles.title1}>{title}</Text>
          </View>
          <View style={styles.containerContentSection}>
            {items.map(({title, description, price, image}, j) => (
              <View style={styles.item} key={j}>
                <View style={styles.containerLeftPartSection}>
                  <ImageBackground
                    source={_getImageSource(image)}
                    resizeMode="stretch"
                    style={styles.imageLeftPart}
                  />
                </View>
                <View style={styles.containerRightPartSection}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {description}
                  </Text>
                  <Text style={styles.price}>{price}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
      <View style={{height: hScreen}} />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  section: {},
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontSize: 14,
  },
  title1: {
    fontSize: 24,
  },
  title2: {
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: '#247A00',
  },
  item: {
    borderBottomColor: '#e2e3e4',
    borderBottomWidth: 1,
    marginTop: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  containerTitleSection: {
    backgroundColor: '#D6D6D6',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  containerContentSection: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  containerLeftPartSection: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRightPartSection: {
    paddingLeft: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  imageLeftPart: {
    width: 100,
    height: 100,
  },
});
