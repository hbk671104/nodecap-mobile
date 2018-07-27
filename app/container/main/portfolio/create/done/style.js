import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  content: {
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingTop: 90,
    },
    title: {
      color: '#1890FF',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      alignSelf: 'center',
    },
    image: {
      alignSelf: 'center',
    },
    item: {
      container: {
        marginTop: 42,
      },
      title: {
        marginBottom: 12,
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: 13,
      },
      subtitle: {
        color: 'rgba(0, 0, 0, 0.45)',
      },
      highlight: {
        color: '#1890FF',
        fontWeight: 'bold',
        fontSize: 15,
      },
    },
  },
  continue: {
    marginTop: 16,
  },
  checkDetail: {
    container: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#1890FF',
    },
    title: {
      color: '#1890FF',
      fontWeight: 'normal',
    },
  },
  done: {
    container: {
      position: 'absolute',
      top: 32 + getStatusBarHeight(true),
      right: 24,
    },
    text: {
      fontSize: 14,
      color: '#1890FF',
    },
  },
};
