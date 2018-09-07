import store from '../../index';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import JPush from 'jpush-react-native';
import R from 'ramda';

const isIOS = Platform.OS === 'ios';

const handleTabBarPress = route => {
  switch (route) {
    case 'NotificationCenter':
      if (isIOS) {
        JPush.setBadge(0, () => null);
      }

      store.dispatch({
        type: 'notification/clearBadge',
      });
      break;
    default:
      break;
  }
};

export { handleTabBarPress };
