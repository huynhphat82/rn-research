import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView>
      <View style={{height: '100%', width: '100%'}}>
        <WebView
          source={{uri: 'https://reactnative.dev/'}}
          style={{marginTop: 20}}
        />
        {/* <WebView
          originWhitelist={['*']}
          source={{ html: '<h1>Hello world</h1>' }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default App;
