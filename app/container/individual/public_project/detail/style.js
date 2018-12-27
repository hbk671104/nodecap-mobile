import { realBarHeight, navBarHeight } from 'component/navBar';
import { Dimensions, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const window = Dimensions.get('window');
export const deviceHeight = window.height;
export const deviceWidth = window.width;
export const switchHeight = 50;
export const bottomTabHeight = 55;
export const buttonPadding = bottomTabHeight + getBottomSpace() + 12;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1890FF',
  },
  navBar: {
    wrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
    container: {
      backgroundColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    title: {
      color: 'white',
    },
  },
  page: {
    backgroundColor: 'white',
    paddingBottom: 20,
    minHeight:
      deviceHeight -
      realBarHeight -
      navBarHeight -
      bottomTabHeight -
      getBottomSpace(),
  },
  claim: {
    container: {
      position: 'absolute',
      right: 0,
      top: 230,
    },
  },
  explanation: {
    container: {
      borderRadius: 2,
      width: 270,
      height: 159,
      backgroundColor: 'white',
    },
    content: {
      container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 22,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
      },
      text: {
        color: '#333333',
        fontSize: 13,
        lineHeight: 18,
        marginTop: 10,
      },
    },
    bottom: {
      container: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#DDDDDD',
      },
      text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1890FF',
      },
    },
  },
};
