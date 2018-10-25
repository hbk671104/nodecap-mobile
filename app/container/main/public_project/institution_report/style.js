import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    content: {
      paddingVertical: 0,
    },
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 12,
  },
  swiper: {
    container: {
      paddingVertical: 10,
    },
    item: {
      container: {
        flex: 1,
        marginHorizontal: 12,
      },
      image: {
        height: 65,
        borderRadius: 2,
      },
    },
    pagination: {
      bottom: 3,
    },
  },
};
