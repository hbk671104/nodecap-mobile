import { realBarHeight, navBarHeight } from 'component/navBar';
import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const window = Dimensions.get('window');
export const deviceHeight = window.height;
export const deviceWidth = window.width;
export const switchHeight = 50;
export const bottomTabHeight = 55;
export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    wrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
    container: {
      backgroundColor: 'transparent',
    },
    icon: {
      color: 'white',
    },
  },
  page: {
    backgroundColor: 'white',
    minHeight:
      deviceHeight -
      realBarHeight -
      navBarHeight -
      bottomTabHeight -
      getBottomSpace(),
  },
};
