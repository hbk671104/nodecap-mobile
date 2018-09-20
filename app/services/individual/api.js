import request from '../../utils/request';

export const login = payload => {
  return request.post('/access-token', payload);
};

export const smsLogin = payload => {
  return request.post('/access-token-via-verification-code', payload);
};

export const getVerificationCode = () => {
  return request.post('/verification-codes/signin');
};

export const getCurrentUser = () => {
  return request.get('/user');
};

export const getFavoredCoin = () => {
  return request.get('/user/coins');
};

export const favorCoin = payload => {
  return request.post('/coins/public', payload);
};

export const unfavorCoin = cid => {
  return request.delete(`/user/coins/${cid}`);
};
