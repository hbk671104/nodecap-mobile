import { StyleSheet, Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    container: {
      flex: 1,
    },
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
      image: {
        width: window.width,
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
  roi: {
    container: {
      paddingBottom: 20,
      backgroundColor: 'white',
    },
    top: {
      container: {
        paddingTop: 20,
        paddingBottom: 15,
        alignItems: 'center',
      },
      wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        color: '#1890FF',
        fontSize: 17,
        fontWeight: 'bold',
      },
    },
    item: {
      container: {
        paddingVertical: 10,
        paddingLeft: 32,
        paddingRight: 32,
      },
      contentContainer: {
        marginLeft: 36,
      },
      title: {
        color: 'rgba(0, 0, 0, 0.45)',
      },
      subtitle: {
        color: '#1890FF',
        fontSize: 20,
        marginTop: 2,
      },
      ranking: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.45)',
        alignSelf: 'flex-start',
      },
    },
  },
  divider: {
    container: {
      width: window.width,
      height: 1,
      backgroundColor: 'white',
    },
    coordinate: {
      x1: 32,
      y1: 0,
      x2: window.width - 32,
      y2: 0,
    },
  },
  propaganda: {
    container: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingTop: 12,
      paddingBottom: 17,
      paddingLeft: 27.5,
      paddingRight: 32,
    },
    left: {
      container: {
        flex: 1,
      },
      title: {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 11,
        marginTop: 8,
      },
    },
    image: {
      container: {
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(11, 26, 39, .25)',
            shadowOffset: { height: 1, width: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
          },
          android: {
            elevation: 3,
          },
        }),
      },
    },
  },
  actionBar: {
    container: {
      height: 65,
      backgroundColor: 'white',
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
