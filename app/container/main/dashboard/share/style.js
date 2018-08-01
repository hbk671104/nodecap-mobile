import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // width: 375,
  },
  navBar: {
    content: {
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 17.5,
      },
    },
    bottom: {
      container: {
        paddingBottom: 16,
        alignItems: 'center',
      },
      org: {
        container: {},
        text: {
          color: 'white',
          fontSize: 18,
        },
      },
      fund: {
        container: {
          marginTop: 15,
        },
        text: {
          color: 'white',
          fontSize: 36,
          fontWeight: 'bold',
        },
      },
      arrow: {
        container: {
          marginTop: 8,
        },
      },
      date: {
        container: {
          marginTop: 2,
        },
        text: {
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
    },
    bar: {
      container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 85,
        flexDirection: 'row',
      },
      group: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      },
      content: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 7.5,
      },
    },
  },
  actionBar: {
    container: {
      height: 65,
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    content: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
  },
};
