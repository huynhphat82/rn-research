import React from 'react';
import {Text, TextPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {Layout} from '../../config';

const Texter = ({children, lines, tail, scaleFont, style, ...propsRest}) => {
  style = !Array.isArray(style) ? [style] : style;
  return (
    <Text
      {...propsRest}
      numberOfLines={lines}
      ellipsizeMode={tail}
      allowFontScaling={scaleFont}
      style={[Layout.defaultTextStyle, ...style]}>
      {children}
    </Text>
  );
};

export default Texter;

Texter.props = {
  lines: PropTypes.number || null || undefined,
  tail: 'head' || 'middle' || 'tail' || 'clip',
  scaleFont: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), //TextPropTypes.style
  propsRest: PropTypes.object,
};

Texter.defaultProps = {
  lines: null,
  tail: 'tail',
  scaleFont: false,
  style: {},
  propsRest: {},
};
