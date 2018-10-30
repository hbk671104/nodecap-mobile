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

export const myProjectList = params => {
  return request.get('/coins/owned', {
    params,
  });
};

export const searchProject = params => {
  return request.get('/coins/public', {
    params,
  });
};

export const createMyProject = payload => {
  return request.post('/coins', payload);
};

export const editMyProject = ({ id, payload }) => {
  return request.put(`/coins/${id}`, payload);
};

export const claimMyProject = ({ id, payload }) => {
  return request.post(`/coins/${id}/own`, payload);
};

export function submitComment(coin_id, content) {
  return request.post('/user/share-comment', {
    coin_id,
    content,
  });
}

export function searchInstitution(params) {
  return request.get('/industry-investments', {
    params,
  });
}

export function createInstitution(payload) {
  return request.post('/industry-investments', payload);
}

export function editInstitution({ id, payload }) {
  return request.put(`/industry-investments/${id}`, payload);
}

export function myInstitution(payload) {
  return request.get('/my-industry-investments', payload);
}

export function claimMyInstitution({ id, payload }) {
  return request.post(`/industry-investments/${id}/own`, payload);
}

export function getBanners() {
  return request.get('/banner');
}
