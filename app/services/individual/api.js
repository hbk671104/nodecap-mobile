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
