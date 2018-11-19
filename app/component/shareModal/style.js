import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { shadow } from '../../utils/style';

export const translateY = 310 - getBottomSpace();
export default {
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
  recommended: {
    wrapper: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'black',
      opacity: 0,
    },
    container: {
      position: 'absolute',
      backgroundColor: 'white',
      height: 164,
      bottom: 0,
      left: 0,
      right: 0,
      transform: [
        {
          translateY,
        },
      ],
      ...shadow,
      shadowOffset: {
        height: -2,
      },
      shadowOpacity: 0.2,
    },
    header: {
      container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
      },
      action: {
        fontSize: 14,
        color: '#1890FF',
      },
    },
    dummy: {
      height: getBottomSpace(),
    },
  },
  buttons: {
    height: 120,
  },
  buttonsSpecific: [
    {
      justifyContent: 'center',
    },
    {
      justifyContent: 'space-around',
      paddingHorizontal: 37.5,
    },
    {
      justifyContent: 'space-between',
      paddingHorizontal: 37.5,
    },
    {
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
  ],
  shareItem: {

  },
  shareItemImageWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareItemText: { fontSize: 12, color: 'rgba(0,0,0,0.85)', textAlign: 'center' },
  cancel: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderTopColor: '#e9e9e9',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
};
