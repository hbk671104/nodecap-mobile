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
      global.track('动态推送点击');
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
      global.track('动态推送接收');
      store.dispatch({
        type: 'notification/fetch',
      });

      // show badge ?
      const { router } = store.getState();
      if (getCurrentScreen(router) === 'NotificationCenter') {
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
