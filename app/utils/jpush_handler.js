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

  const routeMap = {
    news: {
      trackName: '动态推送点击',
      routeName: 'NotificationDetail',
      params: {
        id,
      },
    },
    coin_owner: {
      trackName: '项目审核推送点击',
      routeName: 'MyProject',
    },
    industry_owner: {
      trackName: '机构审核推送点击',
      routeName: 'MyInstitution',
    },
    coin_daily_increment: {
      trackName: '项目集增量更新推送点击',
      routeName: 'ProjectRepo',
      params: {
        coinset_id: id,
      },
    },
    homepage: {
      trackName: '首页',
    },
    research_report_list: {
      trackName: '研报列表页',
      routeName: 'InstitutionReport',
    },
  };

  const type_obj = R.path([type])(routeMap);
  if (R.isNil(type_obj)) {
    return;
  }

  const trackName = R.path(['trackName'])(type_obj);
  const routeName = R.path(['routeName'])(type_obj);
  const params = R.path(['params'])(type_obj);

  global.track('App_NotificationPushOpen', {
    trackName,
  });

  if (R.isNil(routeName)) {
    return;
  }

  store.dispatch(
    NavigationActions.navigate({
      routeName,
      ...(R.isNil(params) ? {} : { params }),
    }),
  );
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
      global.track('App_NotificationPushReceive', {
        trackName: '动态推送接收',
      });
      store.dispatch({
        type: 'notification/fetch',
      });

      // show badge ?
      const { router } = store.getState();
      if (getCurrentScreen(router) === 'NotificationCenter') {
        break;
      }
      break;
    }
    case 'coin_daily_increment':
      global.track('App_NotificationPushReceive', {
        trackName: '项目集增量更新推送接收',
      });
      store.dispatch({
        type: 'coinSets/fetch',
      });
      break;
    default:
      break;
  }
};

export { handleOpen, handleReceive };
