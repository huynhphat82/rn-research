import React, { useState } from 'react';
import {SafeAreaView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import HeightEqualList from './src/modules/list/HeightEqualList';
import { StickyList } from './src/modules/list/StickyList';
import DragDrop from './src/components/DragDrop';
import Carousel from './src/components/Carousel';
import ModalAnimated from './src/modules/modals/ModalAnimated';
import MyCarousel from './src/modules/carousels/MyCarousel';
import UberEats from './src/modules/UberEats';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EatyLargeList from './src/modules/eaty/EatyLargeList';
import Icon from 'react-native-vector-icons/Ionicons';
// import Eaty from './src/modules/list/Eaty';
import Eaty from './src/modules/scrollview-eaty/Eaty';

Icon.loadFont();

const App = () => {
  const examples = [
    'LargeListExamples',
    'WaterfallListExamples',
    'StickyFormExample',
  ];

  const [visible, setVisible] = useState(false);

  const bodyModal = () => (
    <>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text>X</Text>
      </TouchableOpacity>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </>
  );

  return (
    <>
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Eaty />
        {/* <EatyLargeList /> */}
        {/* <UberEats /> */}
        {/* <MyCarousel /> */}
        {/* <TouchableOpacity onPress={() => setVisible(true)}>
          <Text>Open</Text>
        </TouchableOpacity>
        <ModalAnimated visible={visible} onDismiss={() => setVisible(!visible)} type="bottom">
          {bodyModal()}
        </ModalAnimated> */}
        {/* <ModalAnimated visible={visible} onDismiss={() => setVisible(false)}>
          <>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </>
        </ModalAnimated> */}
        {/* <Carousel /> */}
        {/* <DragDrop /> */}
        {/* <HeightEqualList /> */}
        {/* <StickyList /> */}
        {/* <SpringScrollView>
          {examples.map((str, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => this.props.navigation.navigate(str)}>
              <Text style={styles.text}>{str}</Text>
            </TouchableOpacity>
          ))}
        </SpringScrollView> */}
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {alignItems: 'center'},
});

export default App;
