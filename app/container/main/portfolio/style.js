import { Dimensions } from 'react-native';

const tabWidth = 125;
const indicatorWidth = 25;

export default {
  container: {
    flex: 1,
  },
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width,
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
    right: {
      fontSize: 14,
      color: 'white',
    },
  },
  searchBar: {
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      paddingRight: 12,
    },
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
      width: tabWidth * 2,
    },
    tab: {
      width: tabWidth,
      padding: 0,
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
      bottom: 0,
      left: (tabWidth - indicatorWidth) / 2,
    },
  },
};
