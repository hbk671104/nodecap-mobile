import R from 'ramda';
import {
  resourceIndex,
  resourceDetail,
  createResource,
  editResource,
  deleteResource,
} from '../services/api';

const paginate = (state, action, key) => {
  const oldData = R.pathOr([], [key, 'index', 'data'])(state);
  const newData = R.pathOr([], ['payload', 'data'])(action);
  const pagination = R.pathOr({}, ['payload', 'pagination'])(action);

  if (R.path(['current'])(pagination) === 1) {
    return action.payload;
  }

  return {
    ...action.payload,
    data: R.concat(oldData, newData),
  };
};

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
    *refresh({ payload, callback }, { put, call, select }) {
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

        // others
        // let type = payload.types;
        // if (R.length(types) === 0)
        // type = type.map(t => t.id).join(',');
        // yield put({
        //   type: 'index',
        //   payload: {
        //     type,
        //   },
        // });

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
            index: paginate(state.list, action, type),
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
