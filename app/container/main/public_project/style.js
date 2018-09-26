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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
};
