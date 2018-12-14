import React from 'react';
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';
import createLoading from 'dva-loading';

export { connect };

export default options => {
  const app = create(options);
  // HMR workaround
  if (!global.registered) options.models.forEach(model => app.model(model));
  global.registered = true;

  app.use(
    createLoading({
      only: [
        'login/login',
        'login/logout',
        'login/smsLogin',
        'login/setPassword',
        'login/sendLoginSMS',
        'login/switch',
        'portfolio/index',
        'portfolio/investment',
        'portfolio/get',
        'portfolio/getStat',
        'portfolio/getExtra',
        'portfolio/search',
        'portfolio/searchMatchedCoin',
        'user/createCompany',
        'resource/get',
        'resource/index',
        'colleague/get',
        'colleague/index',
        'fund/fetchHoldingReport',
        'fund/fetchGeneralReport',
        'fund/fetchInvestmentReport',
        'notification/fetch',
        'notification/get',
        'recommendation/fetch',
        'recommendation/update',
        'public_project/fetch',
        'public_project/get',
        'public_project/favor',
        'public_project/getBase',
        'public_project/addToWorkflow',
        'public_project/fetchSelected',
        'institution/fetch',
        'institution/get',
        'institution/fetchReports',
        'institution/fetchReportSet',
        'news/index',
        'favored/fetch',
        'activity/fetch',
        'coinSets/fetchCoins',
        'project_create/fetch',
        'project_create/claimProject',
        'project_create/submitProject',
        'project_create/editMember',
        'institution_create/fetch',
        'institution_create/submitInstitution',
        'institution_create/claimInstitution',
        'institution_create/editMember',
        'service/fetch',
        'service/get',
        'service/search',
        'hotnode_index/fetchCategory',
        'hotnode_index/fetchCoin',
        'hotnode_index/fetchCoin',
        'globalSearch/coins',
        'globalSearch/reports',
        'globalSearch/industries',
        'globalSearch/services',
        'globalSearch/users',
        'message_center/getUserById',
        'message_center/fetchNotification',
        'investNews/fetch',
        'rank/upFetch',
        'rank/downFetch',
        'dapp/fetchListData',
        'dapp/fetchDappDetail',
        'user/updateUserProfile',
      ],
    }),
  );
  app.start();
  // eslint-disable-next-line no-underscore-dangle
  const store = app._store;

  app.start = container => () => <Provider store={store}>{container}</Provider>;
  app.getStore = () => store;

  return app;
};
