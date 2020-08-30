import React, {PureComponent} from 'react';

const withDelayComponent = (WrappedComponent) => {
  class WithDelayComponent extends PureComponent {
    static defaultProps = {
      delay: 600,
      minLength: 3,
      onChangeText: undefined,
      value: undefined,
      inputRef: undefined,
    };

    timerId = null;

    constructor(props) {
      super(props);
      this.state = {
        value: props.value || '',
      };
    }

    componentWillUnmount() {
      this.clearTimer();
    }

    clearTimer = () => {
      clearTimeout(this.timerId);
    };

    updateTimer = (value) => {
      this.clearTimer();
      this.timerId = setTimeout(() => this.notify(value), this.props.delay);
    };

    notify = (value) => {
      typeof this.props.onChangeText === 'function' &&
        this.props.onChangeText(
          value.length >= this.props.minLength ? value : '',
        );
    };

    onChangeText = (value) => {
      this.setState({value}, () =>
        this.updateTimer(value.length >= this.props.minLength ? value : ''),
      );
    };

    onBlur = () => {
      this.clearTimer();
      this.notify(this.state.value);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          ref={this.props.inputRef}
          value={this.state.value}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
        />
      );
    }
  }
  WithDelayComponent.displayName = `withDelayComponent(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WithDelayComponent;
};

export default withDelayComponent;
