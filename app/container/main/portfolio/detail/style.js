import { shadow } from '../../../../utils/style';
import { headerHeight } from './header';
import { realBarHeight, navBarHeight } from 'component/navBar';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
export const deviceHeight = window.height;
export const deviceWidth = window.width;
export const switchHeight = 50;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {},
  scroll: {
    contentContainer: { paddingTop: switchHeight },
  },
  page: {
    minHeight: deviceHeight - realBarHeight - navBarHeight,
  },
  record: {
    container: {
      height: 43,
      marginHorizontal: 12,
      backgroundColor: '#F8F8F8',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginBottom: 24,
    },
    text: {
      fontSize: 13,
      color: '#1890FF',
      fontWeight: 'bold',
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
  bottomTab: {
    wrapper: {
      height: 50,
      backgroundColor: 'white',
      ...shadow,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};
