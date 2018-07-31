import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const indicatorWidth = 25;
export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  initialLayout: {
    height: 0,
    width: deviceWidth,
  },
  navBar: {
    container: {
      backgroundColor: 'transparent',
    },
    title: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  },
  searchBar: {
    container: {
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  share: {
    paddingHorizontal: 12,
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    indicator: {
      height: 3,
      backgroundColor: 'white',
      width: indicatorWidth,
      borderRadius: 1.5,
      bottom: 5,
    },
  },
};
