import R from 'ramda';
import * as Individual from 'services/individual/api';
import * as API from 'services/api';

import { paginate } from 'utils/pagination';
import { convertToFormData, convertToPayloadData } from 'utils/utils';

const initialCurrent = {
  members: [{}],
  social_network: [{}],
  roadmap: [{}],
  purpose: [],
  tags: [],
};

export default {
  namespace: 'project_create',
  state: {
    route: [
      {
        name: 'CreateMyProjectBasicInfo',
        title: '基本信息',
      },
      {
        name: 'CreateMyProjectDescription',
        title: '项目介绍',
      },
      {
        name: 'CreateMyProjectTeam',
        title: '团队成员',
      },
      {
        name: 'CreateMyProjectSocial',
        title: '社群信息',
      },
      {
        name: 'CreateMyProjectRoadMap',
        title: '路线图',
      },
      {
        name: 'CreateMyProjectFunding',
        title: '募资信息',
      },
    ],
    list: null,
    query: null,
    current: null,
    owner: null,
  },
  effects: {
    *fetch({ payload }, { put, call }) {
      try {
        const { data } = yield call(Individual.myProjectList, payload);

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
        const { data } = yield call(API.getCoinInfo, id);

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
    *claimProject({ id, payload, callback }, { put, call }) {
      try {
        const { status } = yield call(Individual.claimMyProject, {
          id,
          payload,
        });

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *submitProject({ callback }, { select, put }) {
      try {
        const owner = yield select(state =>
          R.path(['project_create', 'owner'])(state),
        );
        const current = yield select(state =>
          R.path(['project_create', 'current'])(state),
        );

        const sanitized_data = convertToPayloadData({
          ...current,
          owner: [owner],
        });

        if (current.coin_id) {
          yield put.resolve({
            type: 'editProject',
            id: current.coin_id,
            payload: sanitized_data,
            callback,
          });
        } else {
          yield put.resolve({
            type: 'createProject',
            payload: sanitized_data,
            callback,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    *createProject({ payload, callback }, { put, call }) {
      try {
        const { status } = yield call(Individual.createMyProject, payload);

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *editProject({ id, payload, callback }, { put, call }) {
      try {
        const { status } = yield call(Individual.editMyProject, {
          id,
          payload,
        });

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *refresh(_, { put }) {
      try {
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            'per-page': 20,
          },
        });
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
        current: convertToFormData({ ...payload }),
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
