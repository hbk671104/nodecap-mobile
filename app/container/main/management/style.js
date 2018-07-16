import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    title: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
    right: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      item: {
        height: 18,
        width: 18,
      },
    },
  },
  separator: {
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
  },
  list: {
    contentContainer: {
      paddingVertical: 0,
    },
  },
};
