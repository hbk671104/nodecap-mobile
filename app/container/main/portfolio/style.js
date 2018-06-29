import { Dimensions } from 'react-native';

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
  },
  searchBar: {
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
    },
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
    },
  },
};
