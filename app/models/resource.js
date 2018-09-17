import R from 'ramda';
import {
  resourceIndex,
  resourceDetail,
  createResource,
  editResource,
  deleteResource,
} from '../services/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'resource',
  state: {
    types: [
      {
        id: 1,
        name: '投资人',
      },
      {
        id: 2,
        name: 'FA',
      },
      {
        id: 3,
        name: '创业服务',
      },
      {
        id: 4,
        name: '媒体',
      },
      {
        id: 5,
        name: '创业者',
      },
    ],
    list: null,
    search: null,
    current: null,
  },
  effects: {
    /**
     * 资源库列表
     * @param payload
     * @param call
     * @param put
     */
    *index({ payload = {} }, { call, put }) {
      try {
        const res = yield call(resourceIndex, payload);
        yield put({
          type: 'list',
          payload: res.data,
          params: payload,
        });
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 资源库搜索
     * @param payload
     * @param call
     * @param put
     */
    *search({ payload = {}, callback }, { call, put }) {
      try {
        const res = yield call(resourceIndex, payload);
        yield put({
          type: 'searchlist',
          payload: res.data,
          params: payload,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 资源库详情
     * @param payload
     * @param callback
     * @param call
     * @param put
     * @param all
     */
    *get({ payload, callback }, { call, put }) {
      try {
        const res = yield call(resourceDetail, {
          id: payload,
        });
        yield put({
          type: 'detail',
          payload: res.data,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 创建资源库项目
     * @param payload
     * @param callback
     * @param call
     */
    *create({ payload, callback }, { call, put }) {
      try {
        const res = yield call(createResource, {
          ...payload,
        });

        yield put({
          type: 'refresh',
          payload,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 更新资源库项目
     * @param id
     * @param payload
     * @param callback
     * @param call
     */
    *save({ id, payload, callback }, { call, put, take }) {
      try {
        const res = yield call(editResource, id, {
          ...payload,
        });

        yield put({
          type: 'get',
          payload: id,
        });
        yield take('get/@@end');

        yield put({
          type: 'refresh',
          payload,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 删除资源库项目
     * @param id
     * @param callback
     * @param call
     */
    *delete({ id, payload, callback }, { put, call }) {
      try {
        const res = yield call(deleteResource, id);

        yield put({
          type: 'refresh',
          payload,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *refresh({ payload, callback }, { all, put, call, select }) {
      try {
        // search
        const search = yield select(state =>
          R.path(['resource', 'search'])(state),
        );
        if (!R.isNil(search)) {
          yield put({
            type: 'search',
            payload: search.params,
          });
        }

        // refresh all
        yield put({
          type: 'index',
          payload: {
            type: '0',
          },
        });

        const types = R.pathOr([], ['types'])(payload);
        if (!R.isEmpty(types)) {
          yield all(
            types.map(t => {
              return put({
                type: 'index',
                payload: {
                  type: t.id,
                },
              });
            }),
          );
        }

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    list(state, action) {
      const { type } = action.params;
      return {
        ...state,
        list: {
          ...state.list,
          [type]: {
            index: paginate(
              R.pathOr({}, ['list', type, 'index'])(state),
              action.payload,
            ),
            params: action.params,
          },
        },
      };
    },
    detail(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    searchlist(state, action) {
      return {
        ...state,
        search: {
          index: action.payload,
          params: action.params,
        },
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        current: null,
      };
    },
    clearSearch(state) {
      return {
        ...state,
        search: null,
      };
    },
  },
};
