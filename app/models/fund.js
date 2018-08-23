import {
  getFunds,
  holdingReport,
  investmentReport,
  generalReport,
} from '../services/api';
import R from 'ramda';

export default {
  namespace: 'fund',
  state: {
    funds: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      try {
        const { data } = yield call(getFunds);
        yield put({
          type: 'save',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchHoldingReport({ id, callback }, { call, put }) {
      try {
        const res = yield call(holdingReport, id);
        yield put({
          type: 'holdingReport',
          payload: res.data,
          id,
        });
        if (callback) {
          callback(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *fetchInvestmentReport({ id, callback }, { call, put }) {
      try {
        const res = yield call(investmentReport, id);
        yield put({
          type: 'investmentReport',
          payload: res.data,
          id,
        });
        if (callback) {
          callback(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *fetchGeneralReport({ id, callback }, { call, put }) {
      try {
        const res = yield call(generalReport, id);
        yield put({
          type: 'generalReport',
          payload: res.data,
          id,
        });
        if (callback) {
          callback(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    save(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        funds: data,
      };
    },
    holdingReport(state, action) {
      const { id, payload } = action;
      return {
        ...state,
        funds: R.map(f => {
          if (`${f.id}` === id) {
            return {
              ...f,
              holding_report: payload,
            };
          }
          return f;
        })(state.funds),
      };
    },
    investmentReport(state, action) {
      const { id, payload } = action;
      return {
        ...state,
        funds: R.map(f => {
          if (`${f.id}` === id) {
            return {
              ...f,
              investment_report: payload,
            };
          }
          return f;
        })(state.funds),
      };
    },
    generalReport(state, action) {
      const { id, payload } = action;
      return {
        ...state,
        funds: R.map(f => {
          if (`${f.id}` === id) {
            return {
              ...f,
              general_report: payload,
            };
          }
          return f;
        })(state.funds),
      };
    },
  },
};
