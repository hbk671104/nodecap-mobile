import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  container: {
    flex: 1,
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
      width: 80,
      left: (deviceWidth / 3 - 80) / 2,
    },
  },
};
