import React, {useState, createRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import R from '../../../routes';
import {useSafeArea} from 'react-native-safe-area-context';
import {NavigationService} from '../../../services';
import {batch} from 'react-redux';
import { WithLoadingButton, useLockedTimeCallback, WithDelayInput } from '../../../components/hoc';

const Order = ({navigation}) => {
  const INSETS = useSafeArea();
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [valueInput, setValueInput] = useState('placeholder');
  const inputRef = createRef();

  const callbackWithNoArgs = useLockedTimeCallback(() => {
    console.log('Do stuff here, like opening a new scene for instance.');
  });

  const callbackWithArgs = useLockedTimeCallback((text) => {
    console.log(text + ' will be logged once every 1000ms tops');
  });

  const increment = () => {
    setCount(count + 1);
  };

  const onPress = () => {
    fetch('https://httpbin.org/get').then(() => {
      // only dispatch once time
      batch(() => {
        increment();
        increment();
        setDisable(!disable);
      });
    });
  };

  const onPressBtn = async () => {
    // fetch('https://httpbin.org/get').then(() => {
    //   // only dispatch once time
    //   console.log('onPressBtn ===>')
    //   batch(() => {
    //     increment();
    //   });
    // });
    await fetch('https://httpbin.org/get');
    batch(() => {
      increment();
    });
  };

  const onChangeText = (text) => {
    fetch('https://httpbin.org/get').then(() => {
      setValueInput(text + '_xxx')
    });
  };

  console.log('count => ', count);
  console.log('disable => ', disable);
  return (
    <View style={{top: INSETS.top + 10}}>
      <Text>This is order screen.</Text>
      <Text>Disabled: {disable ? 'Disabled' : 'Enabled'}</Text>
      <Text>Count: {count}</Text>

      <WithLoadingButton
        onPress={onPressBtn}
        title="Test with loading"
        containerLoadingStyle={{ backgroundColor: 'blue' }}
      />

      <View>
        <Text onPress={callbackWithNoArgs}>Touch me without double tap</Text>
        <Text onPress={() => callbackWithArgs('Hello world')}>Log hello world</Text>
      </View>

      <View>
        <Text>Input value: {valueInput}</Text>
        <WithDelayInput
          value={valueInput}
          onChangeText={onChangeText}
          minLength={3}
          inputRef={inputRef}
          delay={500}
          style={{ padding: 10, borderColor: 'blue', borderWidth: 1 }}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity onPress={onPress}>
          <Text style={{padding: 10, backgroundColor: 'blue', width: 100}}>
            Increment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(R.ACCOUNT, {
              message: 'called from order via NavigationService.',
            });
          }}>
          <Text style={{padding: 10, backgroundColor: 'blue', width: 100}}>
            Go Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            NavigationService.push(R.POLICY, {
              message: 'called from order via NavigationService.',
            });
          }}>
          <Text style={{padding: 10, backgroundColor: 'blue', width: 100}}>
            Go Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;
