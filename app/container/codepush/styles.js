import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  logoTextWrap: {
    alignSelf: 'center',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  logoText: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 115,
  },
  logoBgWrap: {
    position: 'absolute',
    bottom: 0,
  },
  logoBg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2.8089,
    position: 'absolute',
    bottom: 0,
  },
};
