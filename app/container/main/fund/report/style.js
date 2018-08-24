import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
  },
  header: {
    container: {
      paddingVertical: 3,
      paddingHorizontal: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
  },
  separator: {
    marginLeft: 12,
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
  },
  listContent: {
    paddingVertical: 0,
  },
};
