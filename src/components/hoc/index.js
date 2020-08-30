import {
  TouchableHighlight,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import withPreventDoubleClick from './withPreventDoubleClick';
import withPreventNavigateDoubleClick from './withPreventNavigateDoubleClick';
import withLoadingComponent from './withLoadingComponent';
import useLockedTimeCallback from './useLockedTimeCallback';
import withDelayComponent from './withDelayComponent';

export const TouchableHighlightEx = withPreventDoubleClick(TouchableHighlight);
export const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);
export const ButtonEx = withPreventDoubleClick(Button);
export const WithLoadingButton = withLoadingComponent(Button);
export const WithDelayInput = withDelayComponent(TextInput);

export {withPreventNavigateDoubleClick, useLockedTimeCallback};
