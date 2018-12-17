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
      // {
      //   name: 'CreateMyProjectTeam',
      //   title: '团队成员',
      // },
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
    edited: null,
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
    *claimProject({ avatarURL, id, callback }, { select, put, call }) {
      try {
        const owner = yield select(state =>
          R.path(['project_create', 'owner'])(state),
        );

        if (avatarURL) {
          yield put({
            type: 'user/updateCurrentUser',
            payload: {
              avatar_url: avatarURL,
            },
          });
        }

        const { status } = yield call(Individual.claimMyProject, {
          id,
          payload: owner,
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
    *submitProject({ avatarURL, callback }, { select, put }) {
      try {
        const owner = yield select(state =>
          R.path(['project_create', 'owner'])(state),
        );
        const current = yield select(state =>
          R.path(['project_create', 'current'])(state),
        );

        if (current.id) {
          // const edited = yield select(state =>
          //   R.path(['project_create', 'edited'])(state),
          // );

          yield put.resolve({
            type: 'editProject',
            id: current.id,
            payload: convertToPayloadData({
              ...current,
              owner,
            }),
            callback,
          });
        } else {
          yield put.resolve({
            type: 'createProject',
            payload: convertToPayloadData({
              ...current,
              owner,
            }),
            avatarURL,
            callback,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    *createProject({ avatarURL, payload, callback }, { put, call, all }) {
      try {
        if (avatarURL) {
          yield put({
            type: 'user/updateCurrentUser',
            payload: {
              avatar_url: avatarURL,
            },
          });
        }

        const { status } = yield call(Individual.createMyProject, payload);

        yield all([
          put({
            type: 'refresh',
          }),
          put({
            type: 'resetCurrent',
          }),
        ]);

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *editProject({ id, payload, callback }, { put, call, all, select }) {
      try {
        const { status } = yield call(Individual.editMyProject, {
          id,
          payload,
        });

        const current_project_id = yield select(state =>
          R.path(['project_create', 'current', 'id'])(state),
        );

        yield all([
          put({
            type: 'refresh',
          }),
          put({
            type: 'get',
            id: current_project_id,
          }),
        ]);

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *editMember({ id, payload, callback }, { call, put }) {
      try {
        const { status } = yield call(Individual.editTeamMember, {
          id,
          payload,
        });

        yield put({
          type: 'refreshCurrent',
        });

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *deleteMember({ id, callback }, { call, put }) {
      try {
        const { status } = yield call(Individual.deleteTeamMember, id);

        yield put({
          type: 'refreshCurrent',
        });

        if (callback) {
          yield callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *refreshCurrent(_, { put, select }) {
      try {
        const current_project_id = yield select(state =>
          R.path(['project_create', 'current', 'id'])(state),
        );

        yield put({
          type: 'get',
          id: current_project_id,
        });
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
        edited: {
          ...state.edited,
          ...payload,
        },
      };
    },
    setCurrent(state, { payload }) {
      return {
        ...state,
        current: convertToFormData({ ...payload }),
      };
    },
    resetCurrent(state) {
      return {
        ...state,
        current: initialCurrent,
        edited: null,
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
