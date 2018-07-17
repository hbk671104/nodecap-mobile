import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {
    container: {
      minHeight: 60,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
  exchangeItem: {
    container: {
      minHeight: 40,
      paddingLeft: 12 + 32,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  separator: {
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
  },
};
