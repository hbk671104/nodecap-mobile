import { StyleSheet, Dimensions } from 'react-native';

const tabWidth = 125;
const indicatorWidth = 25;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 12,
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
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width,
  },
  item: {
    container: {
      marginLeft: 20,
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 22,
      borderLeftWidth: 0.5,
      borderLeftColor: '#E9E9E9',
      marginBottom: 10,
      position: 'relative',
    },
    point: {
      backgroundColor: '#1890FF',
      width: 8,
      height: 8,
      borderRadius: 4,
      position: 'absolute',
      left: -4,
      top: 0,
    },
    title: {
      marginBottom: 10,
      marginTop: -4,
    },
    time: {
      color: 'rgba(0,0,0,.45)',
      marginBottom: 10,
    },
    titleText: {
      color: '#343434',
      fontWeight: 'bold',
      minWidth: 0,
      flex: 1,
      lineHeight: 20,
      marginBottom: 0,
    },
    content: {
      color: '#343434',
      lineHeight: 25,
    },
    footer: {
      marginTop: 10,
      flexDirection: 'row',
    },
    footerItem: {
      marginRight: 10,
      fontSize: 12,
      color: '#bbbbbb',
    },
    up: {
      color: '#9acf5d',
    },
  },
};
