import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    wrapper: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
  },
  notice: {
    container: {
      marginTop: 16,
      paddingHorizontal: 12,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 11,
      marginLeft: 4,
    },
  },
  avatarGroup: {
    container: {
      alignSelf: 'center',
      marginTop: 64,
    },
    content: {
      height: 146,
      width: 146,
      backgroundColor: '#F0F5FA',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 146,
      width: 146,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      marginTop: 12,
      color: '#1890FF',
    },
  },
  auth: {
    width: 210,
    // marginTop: 140,
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
