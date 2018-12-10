import { Dimensions, StyleSheet } from 'react-native';
import { navBarHeight } from '../../../component/navBar';

const tabWidth = 68;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  initialLayout: {
    height: 0,
    width: deviceWidth,
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    tab: {
      height: navBarHeight,
      width: tabWidth,
      padding: 0,
      margin: 0,
    },
    label: {
      fontSize: 14,
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
  avatar: {
    marginRight: 12,
  },
  title: { fontFamily: 'PingFangSC-Medium', fontSize: 16, color: 'rgba(0,0,0,0.85)', marginBottom: 4.5 },
  tag: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e9e9e9',
    paddingHorizontal: 3,
    paddingVertical: 1.5,
    borderRadius: 1,
    marginRight: 5,
    marginBottom: 4.5,
  },
  tagText: { fontSize: 10, color: 'rgba(0,0,0,0.45)' },
  desc: { minWidth: 0, fontSize: 11, color: 'rgba(0,0,0,0.45)', letterSpacing: 0.13 },
  itemContainer: {
    padding: 12,
    paddingRight: 0,
    paddingBottom: 0,
  },
  right: {
    minWidth: 0,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
    paddingBottom: 12,
  },
};
