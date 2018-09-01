import store from '../../index';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import JPush from 'jpush-react-native';
import R from 'ramda';

const isIOS = Platform.OS === 'ios';

const handleTabBarPress = route => {
  switch (route) {
    case 'NotificationCenter':
      store.dispatch({
        type: 'notification/clearBadge',
      });
      if (isIOS) {
        JPush.setBadge(0, () => null);
      }
      break;
    default:
      break;
  }
};

export { handleTabBarPress };
