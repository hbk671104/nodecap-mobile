import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingVertical: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginHorizontal: 12,
  },
  searchBar: {
    container: {
      flex: 1,
      paddingHorizontal: 12,
    },
  },
  navBar: {
    container: {
      flex: 1,
      paddingHorizontal: 12,
    },
    index: {
      title: {
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.45)',
      },
      text: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#09AC32',
        marginTop: 3,
      },
    },
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
};
