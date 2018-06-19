import { Platform } from 'react-native';

export const raised = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(0,0,0, .4)',
      shadowOffset: { height: 1, width: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
    },
    android: {
      elevation: 2,
    },
  }),
};

export const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(44, 64, 83, 0.1)',
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
    },
    android: {
      elevation: 2,
    },
  }),
};
