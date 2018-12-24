import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  alert: {
    container: {
      marginTop: 16,
    },
    title: {
      marginLeft: 4,
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 11,
    },
  },
  input: {
    container: {
      paddingVertical: 12,
      marginTop: 48,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
  },
  auth: {
    width: 210,
    alignSelf: 'center',
  },
  skip: {
    container: {
      marginTop: 20,
      alignSelf: 'center',
    },
    text: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1890FF',
    },
  },
};
