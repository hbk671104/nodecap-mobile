import R from 'ramda';
import * as Individual from 'services/individual/api';
import * as API from 'services/api';

import { paginate } from 'utils/pagination';
import {
  convertToInstitutionFormData,
  convertToInstitutionPayload,
} from 'utils/utils';

const initialCurrent = {
  members: [{}],
  served_project: [],
};

export default {
  namespace: 'institution_create',
  state: {
    route: [
      {
        name: 'CreateMyInstitutionBasicInfo',
        title: '机构信息',
      },
      {
        name: 'CreateMyInstitutionDescription',
        title: '机构介绍',
      },
      {
        name: 'CreateMyInstitutionTeam',
        title: '团队成员',
      },
      {
        name: 'CreateMyInstitutionServedProject',
        title: '服务过的项目',
      },
    ],
    list: null,
    query: null,
    current: initialCurrent,
    owner: null,
  },
  effects: {
    *fetch({ payload }, { put, call }) {
      try {
        const { data } = yield call(Individual.myInstitution, payload);

        yield put({
          type: 'save',
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *get({ id, callback }, { call, put }) {
      try {
        const { data } = yield call(API.getInstitutionDetail, id);

        yield put({
          type: 'setCurrent',
          payload: data,
          owner: R.pathOr({}, ['owners', 0])(data),
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *search({ payload }, { put, call }) {
      try {
        const { data } = yield call(Individual.searchProject, payload);

        yield put({
          type: 'query',
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *submitInstitution({ callback }, { select, put }) {
      try {
        const owner = yield select(state =>
          R.path(['institution_create', 'owner'])(state),
        );
        const current = yield select(state =>
          R.path(['institution_create', 'current'])(state),
        );

        const sanitized_data = convertToInstitutionPayload({
          ...current,
          owner,
        });

        if (current.id) {
          yield put.resolve({
            type: 'editInstitution',
            id: current.id,
            payload: sanitized_data,
            callback,
          });
        } else {
          yield put.resolve({
            type: 'createInstitution',
            payload: sanitized_data,
            callback,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    *createInstitution({ payload, callback }, { put, call }) {
      try {
        const { status } = yield call(Individual.createInstitution, payload);

        yield put({
          type: 'refresh',
        });
        if (callback) {
          callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *editInstitution({ id, payload, callback }, { put, call }) {
      try {
        const { status } = yield call(Individual.editInstitution, {
          id,
          payload,
        });

        yield put({
          type: 'refresh',
        });

        if (callback) {
          callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *refresh(_, { all, put }) {
      try {
        yield all([
          put({
            type: 'fetch',
            payload: {
              page: 1,
              'per-page': 20,
            },
          }),
          put({
            type: 'resetCurrent',
          }),
          put({
            type: 'user/fetchCurrent',
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: paginate(state.list, payload),
      };
    },
    query(state, { payload }) {
      return {
        ...state,
        query: paginate(state.query, payload),
      };
    },
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: {
          ...state.current,
          ...payload,
        },
      };
    },
    setCurrent(state, { payload, owner }) {
      return {
        ...state,
        current: convertToInstitutionFormData(payload),
        ...(R.isEmpty(owner) ? {} : { owner }),
      };
    },
    resetCurrent(state) {
      return {
        ...state,
        current: initialCurrent,
        query: null,
      };
    },
    resetOwner(state, { payload }) {
      return {
        ...state,
        owner: payload,
      };
    },
    saveOwner(state, { payload }) {
      return {
        ...state,
        owner: {
          ...state.owner,
          ...payload,
        },
      };
    },
  },
};
