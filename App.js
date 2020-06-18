import React, { Component } from 'react';
import {SafeAreaView, InteractionManager, Text} from 'react-native';
import Middleware from '@app/middlewares/Middleware';
import Test from '@app/components/Test';
import database from '@react-native-firebase/database';

class WithLoading extends Component {
  state = { completed: false };

  completed = () => {
    this.setState({ completed: true });
  };

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.props.action(this.completed);
    });
  };

  render = () => {
    if (!this.state.completed) {
      return <Text>Loading...</Text>;
    }

    if (this.props.hasOwnProperty('component')) {
      return typeof this.props.component === 'function'
              ? this.props.component()
              : this.props.component;
    }
    return this.props.children;
  };
}
const App = () => {
  database().ref('users/123').once('value', snap => console.log(snap.val()));
  const testApi = (stopLoading) => {
    // setTimeout(() => {
    //   stopLoading();
    // }, 2000);
    // fetch('https://jsonplaceholder.typicode.com/posts/1')
    // .then(res => {
    //   console.log(res);
    //   stopLoading();
    // });
    // database().ref('users/123').once('value', snap => console.log(snap.val()));
    stopLoading();
  };
  return (
    <>
      <SafeAreaView>
        <WithLoading component={() => <Text>Hello</Text>} action={(s) => testApi(s)} />
        <Middleware />
        <Test />
      </SafeAreaView>
    </>
  );
};

export default App;
