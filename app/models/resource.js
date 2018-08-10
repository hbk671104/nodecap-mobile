import R from 'ramda';
import {
  resourceIndex,
  resourceDetail,
  createResource,
  editResource,
  deleteResource,
} from '../services/api';

const typeMapper = type => {
  switch (type) {
    case '1':
      return 'investor';
    case '2':
      return 'fa';
    case '3':
      return 'startup_service';
    case '4':
      return 'media';
    case '5':
      return 'entrepreneur';
    default:
      return 'all';
  }
};

export default {
  namespace: 'resource',
  state: {
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
    *create({ payload, callback }, { call }) {
      try {
        const res = yield call(createResource, {
          ...payload,
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
    *save({ id, payload, callback }, { call }) {
      try {
        const res = yield call(editResource, id, {
          ...payload,
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
    *delete({ id, callback }, { put, call }) {
      try {
        const res = yield call(deleteResource, id);

        // reload all list
        yield put({ type: 'reload' });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      const key = typeMapper(R.path(['params', 'type'])(action));
      return {
        ...state,
        [key]: {
          index: action.payload,
          params: action.params,
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
