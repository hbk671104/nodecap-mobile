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
        alignItems: undefined,
      },
    },
    input: {
      textAlign: 'right',
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
  import: {
    container: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 24,
    },
  },
  help: {
    container: {
      marginTop: 15,
      marginLeft: 12,
    },
    title: {
      color: 'rgba(3, 3, 3, 0.45)',
      fontSize: 12,
    },
  },
};
