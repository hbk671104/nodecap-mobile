import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 0,
  },
  listHeader: {
    container: {
      padding: 12,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  navBar: {
    right: {
      color: 'white',
      fontSize: 14,
    },
  },
  searchBar: {
    container: {
      height: 55,
      justifyContent: 'center',
      backgroundColor: '#F3F3F3',
      paddingHorizontal: 12,
    },
    wrapper: {
      height: 38,
      backgroundColor: 'white',
    },
    input: {
      fontSize: 14,
      color: '#333333',
    },
  },
  separator: {
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
    marginLeft: 72,
  },
};
