import {Dimensions, Platform, StatusBar} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

const DeviceService = {};

DeviceService.ios = function () {
  return Platform.OS === 'ios';
};

DeviceService.isIPhoneX = function () {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;
};

DeviceService.StatusBarHeight = Platform.select({
  ios: DeviceService.isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export default DeviceService;
