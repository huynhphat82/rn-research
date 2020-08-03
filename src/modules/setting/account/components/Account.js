import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import HeaderBar from '../../../../components/organisms/HeaderBar';
import Texter from '../../../../components/molecules/Texter';

const Account = ({navigation}) => {

  return (
    <View style={{ top: 100 }}>
      <TouchableOpacity onPress={() => navigation.setParams({title: 'Account Updated'})}>
        <Text>Change Title</Text>
      </TouchableOpacity>
      <Text>This is account screen.</Text>
      <Texter style={[{ backgroundColor: 'cyan', fontSize: 25, }, {fontStyle: 'italic'}]}>
        <Text style={{ color: 'blue' }}>
          This is custom text This is custom text This is custom text This is custom text This is custom text This is custom text This is custom text 
        </Text>
        <Text style={{ color: 'red' }}> This is subtext1</Text>
        <Texter style={{ color: 'orange' }}> This is subtext2</Texter>
      </Texter>
    </View>
  );
};

export default Account;

Account._navigationOptions = ({navigation}) => {
  return {
    header: ({ scene, previous, navigation }) => {
      console.log('header => ', scene, previous)
      const { options } = scene.descriptor;
      const title =
        options.headerTitle !== undefined
          ? options.headerTitle
          : options.title !== undefined
          ? options.title
          : scene.route.routeName;
    
      return (
        <View>
          <Text>ABC</Text>
        </View>
      );
    }
  }
};

Account.navigationOptions = ({navigation}) => {
  console.log('navigation ====> ', navigation)
  return {
    headerShown: true,
    // headerMode: 'screen',
    // title: navigation.getParam('title', 'Account Title'),
    headerTitle: () => <HeaderBar />,

    headerTitleAlign: 'center',
    headerTitleAllowFontScaling: false,
    headerBackAllowFontScaling: false,

    // headerTintColor: 'red',
    // headerTransparent: true,
    headerStatusBarHeight: 44,

    // Styling for the header
    headerStyle: {
      height: 80,
      backgroundColor: 'green',
    },
    // Styling for the back title
    headerBackTitleStyle: {
      color: 'red',
      backgroundColor: 'orange',
    },
    // Styling for the title component
    headerTitleStyle: {
      color: 'red',
      backgroundColor: 'orange',
      marginHorizontal: 5,
    },
    // Styling for the container of the headerTitle
    headerTitleContainerStyle: {
      color: 'red',
      backgroundColor: 'orange',
    },

    headerBackTitle: 'Go Back',
    headerBackTitleVisible: true,
    headerTruncatedBackTitle: '<<',
    
    // headerBackground: (props) => {
    //   return <View style={{ backgroundColor: 'purple', flex: 1 }} />
    // },
    // headerBackImage: (props) => {
    //   return <View style={{ backgroundColor: 'red', flex: 1 }} />
    // },

    // styling for the container of the headerLeft component
    headerLeftContainerStyle: {
      flex: 1,
      backgroundColor: 'orange',
    },
    headerLeft: (props) => {
      console.log('[headerLeft] => ', props)
      return (
        <View style={{ flex: 1, backgroundColor: 'orange', width: '100%' }}>
          <TouchableOpacity onPress={navigation.goBack} style={{ backgroundColor: 'blue' }}>
            <Text>Back Back</Text>
          </TouchableOpacity>
        </View>
      );
    },
    // styling for the container of the headerRight component
    headerRightContainerStyle: {
      flex: 1,
      backgroundColor: 'orange',
    },
    headerRight: (props) => {
      console.log('[headerRight] => ', props)
      return (
        <View style={{ flex: 1, backgroundColor: 'orange', width: '100%' }}>
          <TouchableOpacity onPress={navigation.goBack} style={{ backgroundColor: 'blue' }}>
            <Text>Next Next</Text>
          </TouchableOpacity>
        </View>
      );
    },
  };
};
