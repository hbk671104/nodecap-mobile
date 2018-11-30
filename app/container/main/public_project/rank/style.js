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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 12,
  },
  navBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  tabBar: {
    container: {
      backgroundColor: 'transparent',
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
  tableHead: {
    paddingHorizontal: 12,
    height: 27,
    backgroundColor: '#F5F5F5',
  },
  tableHeadText: { fontSize: 12, color: '#666666', letterSpacing: 0.14 },
  item: {
    paddingHorizontal: 12,
    height: 44,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rank: { paddingLeft: 10 },
  index: { fontSize: 13, color: 'rgba(0,0,0,0.65)' },
  coinText: { fontFamily: 'PingFangSC-Semibold', fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 },
  flatPrice: { fontSize: 13, color: 'rgba(0,0,0,0.65)' },
  tip: {
    width: 4.47,
    height: 2.25,
    marginTop: 5,
  },
  percent: { fontSize: 12, marginLeft: 5 },
};
