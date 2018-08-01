import { StyleSheet, Dimensions, Platform } from 'react-native';
import { navBarHeight } from 'component/navBar';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

const window = Dimensions.get('window');

export const PARALLAX_HEADER_HEIGHT = 254 + navBarHeight;
export const DEVICE_WIDTH = window.width;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  swiper: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
      },
      android: {},
    }),
  },
  empty: {
    group: {
      container: {
        alignItems: 'center',
      },
      title: {
        color: '#666666',
        fontSize: 17,
        fontWeight: 'bold',
        lineHeight: 24,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 12,
        color: '#666666',
        fontWeight: 'bold',
        marginTop: 12,
      },
    },
    bottom: {
      container: {
        position: 'absolute',
        bottom: 18,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 14,
        color: '#666666',
        fontWeight: 'bold',
      },
      subtitle: {
        marginTop: 5,
        fontSize: 14,
        color: '#1890FF',
        fontWeight: 'bold',
      },
    },
  },
  parallax: {
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  background: {
    ...Platform.select({
      ios: {
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT,
      },
      android: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT,
      },
    }),
  },
  foreground: {
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            paddingTop: 40,
          },
          {
            paddingTop: 20,
          },
        ),
        height: PARALLAX_HEADER_HEIGHT,
      },
      android: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
        height: PARALLAX_HEADER_HEIGHT,
      },
    }),
  },
  scrollView: {
    container: {
      ...Platform.select({
        ios: {
          paddingTop: 50,
          paddingBottom: 40,
        },
        android: {
          paddingBottom: 40,
        },
      }),
    },
  },
  dashboardGroup: {
    marginTop: 31,
  },
  roiChart: {
    marginTop: 45,
  },
  navbar: {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    title: {
      alignSelf: 'center',
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
    mock: {
      position: 'absolute',
      top: getStatusBarHeight(true) + 12,
      left: 0,
      right: 0,
    },
  },
  dropdown: {
    container: {
      flex: 1,
    },
    wrapper: {
      width: DEVICE_WIDTH,
      ...Platform.select({
        ios: {
          marginTop: 12,
        },
        android: {
          marginTop: -12,
        },
      }),
      borderRadius: 0,
      borderColor: '#E9E9E9',
    },
    item: {
      container: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        color: '#666666',
        fontSize: 14,
      },
    },
    separator: {
      backgroundColor: '#E9E9E9',
      marginHorizontal: 12,
      height: StyleSheet.hairlineWidth,
    },
  },
  shareButton: {
    width: 18,
    height: 18,
  },
  modal: {
    margin: 0,
  },
};
