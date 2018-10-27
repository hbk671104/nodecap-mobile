import { StyleSheet } from 'react-native';

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
      height: 370,
      bottom: 0,
      left: 0,
      right: 0,
      transform: [
        {
          translateY: 310,
        },
      ],
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
  },
};
