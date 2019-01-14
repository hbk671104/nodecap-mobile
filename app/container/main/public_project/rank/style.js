import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

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
      height: 38.5,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E7E7E7',
      backgroundColor: 'white',
    },
    tab: {
      height: 38.5,
      paddingBottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      // flexDirection: 'row',
      position: 'relative',
    },
    hot: {
      height: 15,
      marginRight: 5,
      marginBottom: 2,
      resizeMode: 'contain',
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    underline: {
      height: 0,
    },
    under: {
      // height: 3,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    underInner: {
      width: 15,
      height: 2.5,
      backgroundColor: '#1890FF',
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
  coinText: {
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 13,
    color: 'rgba(0,0,0,0.85)',
    letterSpacing: 0.16,
  },
  flatPrice: { fontSize: 13, color: 'rgba(0,0,0,0.65)' },
  tip: {
    width: 4.47,
    height: 2.25,
    marginTop: 5,
  },
  percent: { fontSize: 12, marginLeft: 5 },
};
