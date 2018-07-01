import { StyleSheet, Dimensions, Platform } from 'react-native';
import { navBarHeight } from 'component/navBar';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { borderColor } from 'component/uikit/color';
import { mainColor } from '../../../component/uikit/color';

const window = Dimensions.get('window');

export const PARALLAX_HEADER_HEIGHT = 254;
export const DEVICE_WIDTH = window.width;

export default {
  container: {
    // width: 375,
    // backgroundColor: '#FF8A00',
  },
  shareBackground: {
    position: 'absolute',
    width: 375,
    left: 0,
    top: 0,
  },
  swiper: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
      },
      android: {
        position: 'absolute',
        top: PARALLAX_HEADER_HEIGHT - 50,
        left: 0,
        right: 0,
      },
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
    width: '100%',
    height: PARALLAX_HEADER_HEIGHT,
    zIndex: -1,
  },
  fundName: {
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    height: PARALLAX_HEADER_HEIGHT,
  },
  fundNameText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1,
    width: '100%',
    height: PARALLAX_HEADER_HEIGHT,
  },
  foreground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: PARALLAX_HEADER_HEIGHT / 2 - 50,
    height: PARALLAX_HEADER_HEIGHT,
  },
  scrollView: {
    alignSelf: 'center',
    width: 375,
  },
  scrollViewContainer: {
    paddingTop: 15,
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
  },
  shareButton: {
    width: 18,
    height: 18,
  },
  wrapper: {
    alignItems: 'center',
  },
  bottom: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(8, 112, 199, 0.27)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionsBar: {
    ...ifIphoneX(
      {
        paddingBottom: 22,
      },
      {}
    ),
    height: 80,
    backgroundColor: 'white',
    width: DEVICE_WIDTH,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    fontSize: 30,
    color: '#A1A1A1',
  },
  shareButtonItem: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 30,
  },
  saveToCameraRoll: {
    color: mainColor,
  },
  saveToCameraRollDisabled: {
    color: '#666666',
  },
};
