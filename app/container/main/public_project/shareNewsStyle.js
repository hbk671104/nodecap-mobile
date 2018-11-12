import { Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { borderColor } from 'component/uikit/color';

const window = Dimensions.get('window');
export const DEVICE_WIDTH = window.width;

export default {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  banner: {
    width: window.width,
    height: 195,
    resizeMode: 'cover',
  },
  clock: {
    width: 15,
    height: 15,
  },
  top: {
    height: 43,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9',
  },
  date: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.16,
    marginLeft: 12,
  },
  content: {
    marginHorizontal: 20,
    paddingBottom: 6.5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: 'rgba(0,0,0,0.85)',
    letterSpacing: 0.22,
    marginTop: 16,
  },
  newsContent: {
    marginTop: 12,
    fontSize: 14,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.17,
    textAlign: 'justify',
    lineHeight: 25,
  },
  tip: {
    marginTop: 102.5,
  },
  tipDot: {
    width: 3,
    height: 3,
    backgroundColor: 'rgba(0,0,0,.25)',
    marginRight: 8,
  },
  index: {
    title: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      marginLeft: 4,
    },
    text: {
      fontSize: 18,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
  footer: {
    width: window.width - 24,
    marginHorizontal: 12,
    marginBottom: 28.25,
    marginTop: 28.25,
  },
  tipText: { fontSize: 12, color: 'rgba(0,0,0,0.45)', letterSpacing: 0.15 },
  actionsBar: {
    ...ifIphoneX(
      {
        paddingBottom: 22,
      },
      {},
    ),
    height: 60,
    backgroundColor: 'white',
    width: DEVICE_WIDTH,
    borderTopWidth: 0.5,
    borderTopColor: borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    fontSize: 20,
    color: 'rgba(0,0,0,.65)',
  },
  backText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0,
    marginLeft: 10,
  },
  shareButtonItem: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 30,
  },
  desc: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 11,
    color: 'rgba(0,0,0,0.45)',
    marginTop: 14,
    marginLeft: 5,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#0090FF',
    borderRadius: 2.5,
    marginRight: 5,
  },
  contentTitle: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 14,
    color: 'rgba(0,0,0,0.85)',
  },
  group: {
    marginBottom: 17,
  },
  groupContent: {
    marginLeft: 10,
    marginTop: 8,
  },
  groupContentText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
  },
  groupContentTip: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.45)',
    marginTop: 12,
  },
  highLight: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 13,
    color: '#0090FF',
    marginLeft: 17,
  },
  orgDivision: {
    height: 15,
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,0,0,.25)',
    marginHorizontal: 5,
  },
  ad: {
    container: {
      marginTop: 0,
      paddingTop: 10,
      paddingHorizontal: 10,
      borderTopWidth: 1,
      borderTopColor: '#E9E9E9',
    },
    logo: {
      width: 95,
      height: 14.5,
    },
    text: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: 'rgba(0,0,0,0.45)',
      marginTop: 10,
    },
    qr: {
      width: 80,
      height: 80,
    },
  },
  siteUrl: {
    marginTop: 0,
  },
  comment: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 27,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textShadowColor: 'rgba(18,41,50,0.25)',
  },
};
