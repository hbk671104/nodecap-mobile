import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    right: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        fontSize: 14,
        color: 'white',
      },
    },
  },
  header: {
    container: {
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    title: {
      container: {
        marginLeft: 12,
      },
      text: {
        color: '#1890FF',
        fontSize: 11,
      },
    },
  },
  list: {
    contentContainer: {
      paddingVertical: 0,
    },
  },
  separator: {
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
  },
};
