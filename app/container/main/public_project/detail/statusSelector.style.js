import { realBarHeight, navBarHeight } from 'component/navBar';
import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const window = Dimensions.get('window');
export const deviceHeight = window.height;
export const deviceWidth = window.width;
export const switchHeight = 50;
export const bottomTabHeight = 55;
export default {
  container: {
    height: 143 + getBottomSpace(),
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#0C1E2F',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  toolbar: {
    padding: 10,
  },
  toolbarButtonText: {
    fontSize: 15,
  },
  cancel: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.36,
  },
  submit: {
    fontSize: 15,
    color: '#1890FF',
    letterSpacing: 0.36,
  },
  statusItem: {
    marginRight: 35,
  },
  statusItemImage: {
    width: 19,
    height: 18,
    resizeMode: 'contain',
  },
  statusItemTouch: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statusItemText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.29,
  },
};
