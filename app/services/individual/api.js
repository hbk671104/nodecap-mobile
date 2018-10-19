import request from '../../utils/request';

export const login = payload => {
  return request.post('/access-token', payload);
};

export const smsLogin = payload => {
  return request.post('/access-token-via-verification-code', payload);
};

export const getVerificationCode = mobile => {
  return request.post('/verification-codes/signin', { mobile });
};

export const getCurrentUser = () => {
  return request.get('/user');
};

export const getFavoredCoin = params => {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/user/coins', {
    params: paramsTransform(params),
  });
};

export const favorCoin = payload => {
  return request.post('/user/coins', payload);
};

export const unfavorCoin = cid => {
  return request.delete(`/user/coins/${cid}`);
};

/**
 * 项目 Token 投资记录
 */
export function getInvestmentsByCoinID(coin_id) {
  return request.get('/investments', {
    params: {
      coin_id,
    },
  });
}

export function createInvestInfo(payload) {
  return request.post('/investments', payload);
}

export function getCoinMarket(id) {
  return request.get(`/coins/${id}/market`);
}

export function getCoinROI(id) {
  return request.get(`/coins/${id}/roi`);
}

export function getCoinTrend(id) {
  return request.get(`/coins/${id}/trend`);
}

export function trendList(payload = {}) {
  const paramsTransform = p => ({
    ...payload,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/news', {
    params: paramsTransform(payload),
  });
}


export function submitComment(coin_id, content) {
  return request.post('/user/share-comment', {
    coin_id,
    content,
  });
}
