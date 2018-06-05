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
      backgroundColor: '#1890FF',
    },
    title: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  },
  searchBar: {
    container: {
      backgroundColor: '#1890FF',
      paddingHorizontal: 12,
    },
  },
  tabBar: {
    container: {
      backgroundColor: '#1890FF',
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
