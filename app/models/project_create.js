import * as Individual from 'services/individual/api';
import { paginate } from 'utils/pagination';

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
    current: initialCurrent,
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
    *claimProject({ id, payload, callback }, { put, all, call }) {
      try {
        const { status } = yield call(Individual.claimMyProject, {
          id,
          payload,
        });

        yield all([
          // refresh list
          put({
            type: 'fetch',
            payload: {
              page: 1,
              'per-page': 20,
            },
          }),
          // reset current
          put({
            type: 'resetCurrent',
          }),
          // clear query
          put({
            type: 'clearQuery',
          }),
        ]);

        if (callback) {
          yield callback(status === 200);
        }
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
    clearQuery(state) {
      return {
        ...state,
        query: null,
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
    resetCurrent(state) {
      return {
        ...state,
        current: initialCurrent,
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
