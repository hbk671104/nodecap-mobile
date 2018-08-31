import store from '../../index';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import { getCurrentScreen } from '../router';

const isIOS = Platform.OS === 'ios';

const handleOpen = extras => {
  if (R.isNil(extras) || R.isEmpty(extras)) {
    return;
  }

  const data = isIOS ? extras : JSON.parse(extras);
  const { type, payload } = data;
  const { action_id: id } = payload;

  switch (type) {
    case 'news':
      store.dispatch(
        NavigationActions.navigate({
          routeName: 'NotificationDetail',
          params: {
            id,
          },
        }),
      );
      break;
    default:
      break;
  }
};

const handleReceive = extras => {
  if (R.isNil(extras) || R.isEmpty(extras)) {
    return;
  }

  const data = isIOS ? extras : JSON.parse(extras);
  const { type, payload } = data;
  const { action_id: id } = payload;

  switch (type) {
    case 'news': {
      store.dispatch({
        type: 'notification/fetch',
      });

      // show badge ?
      const { router } = store.getState();
      const isNotificationCenter =
        getCurrentScreen(router) === 'NotificationCenter';
      if (isNotificationCenter) {
        break;
      }

      store.dispatch({
        type: 'notification/showBadge',
      });
      break;
    }
    default:
      break;
  }
};

export { handleOpen, handleReceive };
