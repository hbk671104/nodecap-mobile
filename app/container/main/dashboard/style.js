import { StyleSheet, Dimensions } from 'react-native';
import { navBarHeight } from 'component/navBar';

const window = Dimensions.get('window');

export const PARALLAX_HEADER_HEIGHT = 254 + navBarHeight;
export const DEVICE_WIDTH = window.width;

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
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
  background: {
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  foreground: {
    paddingTop: 20,
    height: PARALLAX_HEADER_HEIGHT,
  },
  scrollView: {
    container: {
      paddingTop: 48,
      paddingBottom: 40,
    },
  },
  dashboardGroup: {
    marginTop: 31,
  },
  roiChart: {
    marginTop: 45,
  },
  navbar: {
    title: {
      alignSelf: 'center',
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  dropdown: {
    container: {
      flex: 1,
    },
    wrapper: {
      width: DEVICE_WIDTH,
      marginTop: 12,
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
};
