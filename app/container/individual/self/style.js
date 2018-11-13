import { StyleSheet } from 'react-native';

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
  scroll: {
    content: {
      paddingVertical: 20,
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
  item: {
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
};
