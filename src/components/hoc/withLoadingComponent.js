import React, {PureComponent} from 'react';
import {ActivityIndicator, View} from 'react-native';

const withLoadingComponent = (WrappedComponent) => {
  class WithLoadingComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
    }

    setIsLoading = async (isLoading) => {
      return new Promise((resolve) => this.setState({isLoading}, resolve));
    };

    onPress = async () => {
      await this.setIsLoading(true);
      await this.props.onPress();
      await this.setIsLoading(false);
    };
    render() {
      if (this.state.isLoading) {
        return (
          <View style={this.props.containerLoadingStyle || {}}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }
  WithLoadingComponent.displayName = `withLoadingComponent(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WithLoadingComponent;
};

export default withLoadingComponent;
