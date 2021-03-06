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
    list: null,
    search_list: null,
    query: null,
    current: initialCurrent,
    edited: null,
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
    *searchInstitution({ payload, callback }, { put, call, select }) {
      try {
        const current = yield select(state =>
          R.path(['institution_create', 'current'])(state),
        );
        const { data } = yield call(Individual.searchInstitution, {
          ...payload,
          q: current.name,
          type: current.type,
        });

        yield put({
          type: 'searchList',
          payload: data,
        });

        if (callback) {
          yield call(callback, data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *claimInstitution({ avatarURL, callback, id }, { select, call, put }) {
      try {
        const owner = yield select(state =>
          R.path(['institution_create', 'owner'])(state),
        );

        if (avatarURL) {
          yield put({
            type: 'user/updateCurrentUser',
            payload: {
              avatar_url: avatarURL,
            },
          });
        }

        const { status } = yield call(Individual.claimMyInstitution, {
          id,
          payload: owner,
        });

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield call(callback, status === 201);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *submitInstitution({ avatarURL, callback }, { select, put }) {
      try {
        const owner = yield select(state =>
          R.path(['institution_create', 'owner'])(state),
        );
        const current = yield select(state =>
          R.path(['institution_create', 'current'])(state),
        );

        if (current.id) {
          const edited = yield select(state =>
            R.path(['institution_create', 'edited'])(state),
          );

          yield put.resolve({
            type: 'editInstitution',
            id: current.id,
            payload: convertToInstitutionPayload({
              ...edited,
              owner,
            }),
            callback,
          });
        } else {
          yield put.resolve({
            type: 'createInstitution',
            payload: convertToInstitutionPayload({
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
    *createInstitution({ avatarURL, payload, callback }, { put, call, all }) {
      try {
        if (avatarURL) {
          yield put({
            type: 'user/updateCurrentUser',
            payload: {
              avatar_url: avatarURL,
            },
          });
        }

        const { status } = yield call(Individual.createInstitution, payload);

        yield all([
          put({
            type: 'refresh',
          }),
          put({
            type: 'resetCurrent',
          }),
        ]);

        if (callback) {
          yield call(callback, status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *editInstitution({ id, payload, callback }, { put, call, all, select }) {
      try {
        const { status } = yield call(Individual.editInstitution, {
          id,
          payload,
        });

        const current_instituton_id = yield select(state =>
          R.path(['institution_create', 'current', 'id'])(state),
        );

        yield all([
          put({
            type: 'refresh',
          }),
          put({
            type: 'get',
            id: current_instituton_id,
          }),
        ]);

        if (callback) {
          callback(status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *editMember({ id, payload, callback }, { call, put }) {
      try {
        const { status } = yield call(Individual.editInstitutionMember, {
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
        const { status } = yield call(Individual.deleteInstitutionMember, id);

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
        const current_instituton_id = yield select(state =>
          R.path(['institution_create', 'current', 'id'])(state),
        );

        yield put({
          type: 'get',
          id: current_instituton_id,
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
    searchList(state, { payload }) {
      return {
        ...state,
        search_list: paginate(state.search_list, payload),
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
        current: convertToInstitutionFormData(payload),
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
