import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // width: 375,
  },
  actionBar: {
    container: {
      height: 80,
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
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
