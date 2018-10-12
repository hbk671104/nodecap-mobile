import { StyleSheet } from 'react-native';
import { realBarHeight } from 'component/navBar';
import { headerHeight } from './header';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    bottom: {
      height: 64,
    },
  },
  header: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: realBarHeight + 64 - headerHeight / 2,
  },
  scroll: {
    content: {
      paddingTop: 85,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#E9E9E9',
      marginLeft: 12,
      marginVertical: 15,
    },
  },
  wechatCopy: {
    marginLeft: 10,
    color: '#1890FF',
    fontSize: 13,
  },
  wechatNumber: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, .65)',
  },
};
