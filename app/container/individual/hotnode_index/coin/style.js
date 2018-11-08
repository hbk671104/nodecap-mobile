import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 0,
  },
  title: {
    container: {
      paddingHorizontal: 12,
      marginTop: 12,
      marginBottom: 12,
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
  bar: {
    container: {
      height: 24,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 11,
      color: '#B1B1B1',
    },
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 12,
  },
};
