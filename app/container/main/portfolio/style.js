import { Dimensions, Platform } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const indicatorWidth = 25;
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
  add: {
    container: {
      position: 'absolute',
      right: 12,
      bottom: 60,
      backgroundColor: '#1890ff',
      borderRadius: 25,
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0,0,0, .4)',
          shadowOffset: { height: 3, width: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    content: {
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};
