import axios from 'axios';
import * as R from 'ramda';
import store from '../../index';
import Config from 'react-native-config';
import { Toast } from 'antd-mobile';

const codeMessage = {
  1001: '您的账号有误。',
  1002: '您的密码有误。',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 60000,
});

instance.interceptors.response.use((res) => {
  const hasPagination = R.allPass([
    R.has('x-pagination-current-page'),
    R.has('x-pagination-page-count'),
    R.has('x-pagination-per-page'),
    R.has('x-pagination-total-count'),
  ])(res.headers);
  if (hasPagination) {
    res.data = {
      data: res.data,
      pagination: {
        pageCount: parseInt(R.path(['x-pagination-page-count'])(res.headers), 10),
        pageSize: parseInt(R.path(['x-pagination-per-page'])(res.headers), 10),
        total: parseInt(R.path(['x-pagination-total-count'])(res.headers), 10),
        current: parseInt(R.path(['x-pagination-current-page'])(res.headers), 10),
      },
    };
  }
  return res;
}, checkStatus);

function checkStatus({ response = {} }) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 403) {
    return Promise.reject(response);
  }
  if (response.status === 401) {
    store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  const errortext =
    codeMessage[R.path(['data', 'code'])(response)] ||
    R.path(['data', 'message'])(response) ||
    R.path(['data', 0, 'message'])(response);
  // const errorObject = global.__DEV__ ? {
  //   message: `请求错误 ${response.status}: ${R.path(['config', 'url'])(response)}`,
  //   description: errortext,
  // } : {
  //   message: errortext,
  //   description: ' ',
  // };

  Toast.fail(errortext, 1);

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  return Promise.reject(error);
}

export default instance;
