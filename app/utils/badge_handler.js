import store from '../../index';
import { Platform } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import JPush from 'jpush-react-native';
// import R from 'ramda';

const handleBadgeAction = () => {
  if (Platform.OS === 'ios') {
    JPush.setBadge(0, () => null);
  }

  store.dispatch({
    type: 'notification/clearBadge',
  });
};

export { handleBadgeAction };
