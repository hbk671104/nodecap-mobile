import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {
    container: {
      minHeight: 50,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
    },
    content: {
      container: {
        marginRight: 0,
      },
    },
  },
  notice: {
    container: {
      height: 40,
      justifyContent: 'center',
      paddingHorizontal: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 13,
    },
  },
};
