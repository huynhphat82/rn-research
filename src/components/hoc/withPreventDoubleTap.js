import React, {PureComponent} from 'react';

const withPreventDoubleTap = (WrappedComponent) => {
  class PreventDoubleTap extends PureComponent {
    disabled = false;
    onPress = (...args) => {
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      setTimeout(() => (this.disabled = false), this.props.delay || 500);
      typeof this.props.onPress === 'function' && this.props.onPress(...args);
    };
    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }
  PreventDoubleTap.displayName = `withPreventDoubleTap(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return PreventDoubleTap;
};

export default withPreventDoubleTap;
