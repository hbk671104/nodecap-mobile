import { ifIphoneX } from 'react-native-iphone-x-helper';
import { borderColor } from 'component/uikit/color';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
export const DEVICE_WIDTH = window.width;

export default {
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
};
