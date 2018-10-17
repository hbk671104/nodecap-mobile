import {
  Dimensions,
} from 'react-native';
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
  backgroundImage: {
    width: 350,
    resizeMode: 'cover',
  },
  wave: {
    width: window.width,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 10,
  },
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 5,
    lineHeight: 22,
  },
  symbol: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 12,
    color: 'rgba(0,0,0,0.65)',
    marginLeft: 5,
    marginTop: 10,
  },
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
      width: 60,
      height: 60,
    },
  },
  siteUrl: {
    marginTop: 0,
  },
  comment: { fontSize: 16, color: '#FFFFFF', lineHeight: 27, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2, textShadowColor: 'rgba(18,41,50,0.25)' },
};
