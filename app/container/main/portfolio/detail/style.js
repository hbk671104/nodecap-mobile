import { realBarHeight, navBarHeight } from 'component/navBar';
import { Dimensions, StyleSheet } from 'react-native';
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
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginHorizontal: 12,
  },
  navBar: {},
  scroll: {
    contentContainer: { paddingTop: 12 },
  },
  page: {
    minHeight:
      deviceHeight -
      realBarHeight -
      navBarHeight -
      bottomTabHeight -
      getBottomSpace(),
  },
};
