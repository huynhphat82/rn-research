import React, {useEffect, useRef} from 'react';
import {
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';

const ModalAnimated = ({
  type,
  component,
  children,
  visible,
  onDismiss,
  overlay,
  cornerRadius,
  containerStyle,
  duration,
}) => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const _resetPositionAnimation = Animated.timing(panY, {
    toValue: 0,
    duration: duration,
    useNativeDriver: true,
  });

  const _closeAnimation = Animated.timing(panY, {
    toValue: SCREEN_HEIGHT,
    duration: duration,
    useNativeDriver: true,
  });

  const _handleDismiss = () => _closeAnimation.start(() => onDismiss());

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([null, {dy: panY}]),
    onPanResponderRelease: (e, gesture) => {
      // Only close modal when swiping down with fast speed (vy > 2)
      if (Math.abs(gesture.dy) > 0 && Math.abs(gesture.vy) > 2) {
        return _handleDismiss();
      }
      return _resetPositionAnimation.start(/*() => onDismiss()*/);
    },
  });

  const _isBottomModal = () => type == 'bottom';

  const _transformAnimationStyle = () => ({
    transform: [
      {
        translateY: panY.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: _isBottomModal() ? [0, 0, 1] : [-1, 0, 0],
        }),
      },
    ],
  });

  const _getOverlayStyle = () => {
    return overlay ? {backgroundColor: overlay} : {};
  };

  const _getCornerRadiusStyle = () => ({
    [_isBottomModal()
      ? 'borderTopRightRadius'
      : 'borderBottomRightRadius']: cornerRadius,
    [_isBottomModal()
      ? 'borderTopLeftRadius'
      : 'borderBottomLeftRadius']: cornerRadius,
  });

  const _getTypeModalStyle = () => ({
    justifyContent: _isBottomModal() ? 'flex-end' : 'flex-start',
  });

  const _getChildrenElement = () => {
    if (!component) {
      if (!children) {
        throw new Error(
          'You must supply a component props or children elements.',
        );
      }
      return children;
    }
    return typeof component === 'function' ? component() : component;
  };

  useEffect(() => {
    _resetPositionAnimation.start();
  }, [_resetPositionAnimation, visible]);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={_handleDismiss}
      onDismiss={_handleDismiss}
    >
      <View
        style={[
          styles.wrapContainer,
          styles.overlay,
          _getOverlayStyle(),
          _getTypeModalStyle(),
        ]}>
        <Animated.View
          style={[
            styles.container,
            containerStyle,
            _getCornerRadiusStyle(),
            _transformAnimationStyle(),
          ]}
          {..._panResponder.panHandlers}
        >
          {_getChildrenElement()}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalAnimated;

ModalAnimated.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
  component: PropTypes.any,
  children: PropTypes.element,
  cornerRadius: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  duration: PropTypes.number,
  overlay: PropTypes.string,
};

ModalAnimated.defaultProps = {
  type: 'bottom',
  cornerRadius: 12,
  containerStyle: {},
  duration: 300,
};

const styles = StyleSheet.create({
  wrapContainer: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
  },
});
