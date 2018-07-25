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
  item: {
    container: {
      minHeight: 60,
    },
    title: {
      fontWeight: 'bold',
    },
  },
  separator: {
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
  },
  empty: {
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    image: {
      alignSelf: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.65)',
      marginTop: 32,
      alignSelf: 'center',
    },
    button: {
      marginTop: 90,
    },
  },
};
