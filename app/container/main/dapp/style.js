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
      height: 40,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E7E7E7',
      backgroundColor: 'white',
    },
    tab: {
      height: 40,
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
