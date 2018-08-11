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
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical: 20,
      borderBottomColor: '#E9E9E9',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
    },
    notice: {
      container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      content: {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 12,
      },
    },
  },
};
