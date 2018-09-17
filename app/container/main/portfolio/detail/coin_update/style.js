import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 12,
    backgroundColor: '#E9E9E9',
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
  footer: {
    container: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
      height: 42,
      paddingLeft: 22,
      paddingRight: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 13,
    },
    subtitle: {
      color: '#1890FF',
      fontSize: 12,
    },
  },
  empty: {
    container: {
      marginTop: 24,
    },
    image: {
      alignSelf: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
      textAlign: 'center',
      marginTop: 24,
    },
    button: {
      marginHorizontal: 24,
      marginTop: 24,
    },
  },
  fixHeader: {
    container: {
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};
