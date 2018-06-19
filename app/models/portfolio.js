import * as R from 'ramda';
import { portfolioIndex, projectDetail, getProjectInvestTokens, getProjectInvestEquities, getProjectChartData } from '../services/api';

const pagination = (state, action, key) => {
  const data = R.pathOr([], [key, 'index', 'data'])(state);
  const oldStatus = R.path([key, 'params', 'status'])(state);
  if (R.isEmpty(data) || !R.equals(oldStatus, action.params.status)) {
    return action.payload;
  }
  return {
    ...action.payload,
    data: R.concat(data, R.path(['payload', 'data'])(action)),
  };
};

export default {
  namespace: 'portfolio',
  state: {
    current: null,
    exchangeable: {
      index: null,
      params: {},
    },
    unexchangeable: {
      index: null,
      params: {
        status: '4,5,6',
      },
    },
  },
  effects: {
    *index({ payload = {}, callback }, { call, put }) {
      try {
        const req = {
          ...payload,
        };
        const res = yield call(portfolioIndex, req);
        yield put({
          type: 'list',
          payload: res.data,
          params: payload,
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *projectStat({ id, callback }, { call }) {
      try {
        const { data } = yield call(getProjectChartData, id);
        if (callback) {
          callback(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 项目详情
     * @param payload
     * @param callback
     * @param call
     * @param put
     * @param all
     */
    *get({ payload, callback }, { call, put }) {
      try {
        const res = yield call(projectDetail, {
          id: payload,
        });

        yield put({
          type: 'detail',
          payload: res.data,
        });
        yield put({
          type: 'getProjectRelatedData',
          payload,
        });
        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *getProjectRelatedData({ payload }, { call, put }) {
      try {
        const investTokens = yield call(getProjectInvestTokens, payload);
        yield put({
          type: 'relatedDetail',
          payload: investTokens.data,
          relatedType: 'invest_tokens',
        });
      } catch (e) {
        console.log(e);
      }

      try {
        const investEquities = yield call(getProjectInvestEquities, payload);
        yield put({
          type: 'relatedDetail',
          payload: investEquities.data,
          relatedType: 'invest_equities',
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      const key = 'unexchangeable';
      return {
        ...state,
        [key]: {
          index: pagination(state, action, key),
          params: action.params,
        },
      };
    },
    detail(state, action) {
      return {
        ...state,
        current: {
          ...(state.current || {}),
          ...action.payload,
        },
      };
    },
    relatedDetail(state, action) {
      return {
        ...state,
        current: {
          ...(state.current || {}),
          [action.relatedType]: action.payload,
        },
      };
    },
  },
};
