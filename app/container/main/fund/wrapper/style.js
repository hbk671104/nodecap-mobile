import { StyleSheet, Dimensions } from 'react-native';
import { navBarHeight } from 'component/navBar';

const deviceWidth = Dimensions.get('window').width;
const tabWidth = 55;
export default {
  container: {
    flex: 1,
  },
  tabBar: {
    container: {
      height: navBarHeight,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E7E7E7',
    },
    tab: {
      paddingBottom: 0,
    },
    text: {
      fontSize: 14,
    },
    underline: {
      height: 3,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      bottom: 5,
      width: tabWidth,
      left: (deviceWidth / 3 - tabWidth) / 2,
    },
  },
};
