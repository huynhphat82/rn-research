import React, {PureComponent} from 'react';
import {debounce} from 'lodash';

const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends PureComponent {
    onPressDebounced = () => {
      typeof this.props.onPress === 'function' && this.props.onPress();
    };
    onPress = debounce(this.onPressDebounced, this.props.delay || 300, {
      leading: true,
      trailing: false,
    });
    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }
  PreventDoubleClick.displayName = `withPreventDoubleClick(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return PreventDoubleClick;
};

export default withPreventDoubleClick;
