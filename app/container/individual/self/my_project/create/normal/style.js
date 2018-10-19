import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    backgroundColor: '#F5F5F5',
  },
  item: {
    backgroundColor: 'white',
  },
  notice: {
    container: {
      marginTop: 10,
      alignSelf: 'center',
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  claim: {
    container: {
      backgroundColor: 'white',
      height: 40,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#1890FF',
      fontSize: 13,
      fontWeight: 'bold',
    },
  },
  separator: {
    height: 10,
    // backgroundColor: '#F5F5F5',
  },
};
