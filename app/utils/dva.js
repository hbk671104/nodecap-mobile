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
        'login/setPassword',
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
        'institution/fetch',
        'public_project/fetch',
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
