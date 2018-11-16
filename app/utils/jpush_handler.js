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
    institution_list: {
      trackName: '投资机构列表页',
      routeName: 'SingleService',
      params: {
        type: 1,
      },
    },
    institution_detail: {
      trackName: '投资机构详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    exchange_list: {
      trackName: '交易所列表页',
      routeName: 'SingleService',
      params: {
        type: 8,
      },
    },
    exchange_detail: {
      trackName: '交易所详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    media_list: {
      trackName: '媒体列表页',
      routeName: 'SingleService',
      params: {
        type: 7,
      },
    },
    media_detail: {
      trackName: '媒体详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    public_service_list: {
      trackName: '公关列表页',
      routeName: 'SingleService',
      params: {
        type: 3,
      },
    },
    public_service_detail: {
      trackName: '公关详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    service_homepage: {
      trackName: '找服务首页',
      routeName: 'Service',
    },
    ratings_homepage: {
      trackName: '评级与数据列表页',
      routeName: 'SingleService',
      params: {
        type: 6,
      },
    },
    ratings_detail: {
      trackName: '评级与数据详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    fa_homepage: {
      trackName: 'FA首页',
      routeName: 'SingleService',
      params: {
        type: 2,
      },
    },
    fa_detail: {
      trackName: 'FA详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    law_service_homepage: {
      trackName: '法务首页',
      routeName: 'SingleService',
      params: {
        type: 4,
      },
    },
    law_service_detail: {
      trackName: '法务详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    security_homepage: {
      trackName: '安全首页',
      routeName: 'SingleService',
      params: {
        type: 5,
      },
    },
    security_detail: {
      trackName: '安全详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    secondary_market_homepage: {
      trackName: '二级市场首页',
      routeName: 'SingleService',
      params: {
        type: 9,
      },
    },
    secondary_market_detail: {
      trackName: '二级市场详情页',
      routeName: 'InstitutionDetail',
      params: {
        id,
      },
    },
    index_homepage: {
      trackName: '指数首页',
      routeName: 'HotnodeIndex',
    },
    index_detail: {
      trackName: '指数详情页',
      routeName: 'HotnodeCoinIndex',
      params: {
        id,
      },
    },
    project_repo_list: {
      trackName: '项目大全首页',
      routeName: 'ProjectRepo',
    },
    project_repo_set_list: {
      trackName: '项目集列表页',
      routeName: 'ProjectRepo',
      params: {
        coinset_id: id,
      },
    },
    project_detail: {
      trackName: '项目详情页',
      routeName: 'PublicProjectDetail',
      params: {
        id,
      },
    },
  };

  const type_obj = R.path([type])(routeMap);
  if (!R.isNil(type_obj)) {
    const trackName = R.path(['trackName'])(type_obj);
    const routeName = R.path(['routeName'])(type_obj);
    const params = R.path(['params'])(type_obj);

    global.track('App_NotificationPushOpen', {
      trackName,
    });

    if (!R.isNil(routeName)) {
      store.dispatch(
        NavigationActions.navigate({
          routeName,
          ...(R.isNil(params) ? {} : { params }),
        }),
      );
    }
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
