import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    right: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
    },
    wrapper: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
  },
  image: {
    height: 60,
    width: 100,
    borderRadius: 2,
  },
  inputItem: {
    container: {
      paddingVertical: 18,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.65)',
    },
    input: {
      textAlign: 'right',
    },
  },
  notice: {
    container: {
      marginTop: 60,
      paddingHorizontal: 12,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 11,
      marginLeft: 4,
    },
  },
};
