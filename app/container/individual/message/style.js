import { StyleSheet, Dimensions } from 'react-native';
import { navBarHeight } from 'component/navBar';

const deviceWidth = Dimensions.get('window').width;
const tabWidth = 68;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  initialLayout: {
    height: 0,
    width: deviceWidth,
  },
  listContent: {
    paddingVertical: 0,
  },
  navBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
    justifyContent: 'center',
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
      marginHorizontal: deviceWidth / 2 - tabWidth,
    },
    tab: {
      height: navBarHeight,
      width: tabWidth,
      padding: 0,
      margin: 0,
    },
    label: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    indicator: {
      width: 15,
      height: 2.5,
      backgroundColor: '#1890FF',
      left: (tabWidth - 15) / 2,
    },
    badge: {
      wrapper: {
        top: 4,
        right: 4,
      },
    },
  },
  item: {
    badge: {
      wrapper: {
        position: 'relative',
        alignSelf: 'flex-end',
        top: 0,
        right: 0,
      },
    },
  },
};
