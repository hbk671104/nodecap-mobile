import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    container: {
      paddingRight: 12,
    },
    title: {
      container: {
        marginLeft: 0,
      },
      text: {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 14,
      },
    },
    content: {
      container: {
        marginRight: 10,
      },
      text: {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 14,
      },
    },
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 12,
  },
};
