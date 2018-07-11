import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    confirm: {
      color: 'white',
      fontSize: 14,
    },
  },
  item: {
    container: {
      height: 55,
      justifyContent: 'center',
      paddingHorizontal: 12,
      borderBottomColor: '#E9E9E9',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
};
