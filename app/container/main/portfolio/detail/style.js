import { shadow } from '../../../../utils/style';
import { headerHeight } from './header';
import { realBarHeight, navBarHeight } from 'component/navBar';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
export const deviceHeight = window.height;
export const deviceWidth = window.width;
export const switchHeight = 50;
const tabWidth = 30;
export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  initialLayout: {
    height: 0,
    width: deviceWidth,
  },
  navBar: {},
  scroll: {
    contentContainer: { paddingTop: switchHeight },
  },
  tabView: {
    height: deviceHeight - realBarHeight,
  },
  tabBar: {
    container: {
      height: navBarHeight,
      borderBottomWidth: 0,
    },
    tab: {
      paddingBottom: 0,
    },
    text: {
      fontSize: 14,
    },
    underline: {
      height: 3,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      bottom: 5,
      width: tabWidth,
      left: (deviceWidth / 4 - tabWidth) / 2,
    },
  },
  switch: {
    wrapper: {
      position: 'absolute',
      top: realBarHeight + headerHeight - switchHeight / 2,
      left: 0,
      right: 0,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: switchHeight,
      paddingHorizontal: 7,
    },
    content: {
      wrapper: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 2,
        ...shadow,
      },
      container: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      text: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    status: {
      text: {
        fontSize: 14,
        color: 'rgba(0, 0,0 ,0.65)',
      },
    },
    matched: {
      highlight: {
        color: '#0090FF',
      },
    },
  },
};
