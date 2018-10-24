import R from 'ramda';
// import {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUserById,
//   deleteUserById,
// } from '../services/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'service',
  state: {
    list: null,
    detail: null,
  },
  effects: {
    // *fetch({ callback, payload }, { call, put }) {
    //   try {
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // *get({ callback, id }, { call, put }) {
    //   try {
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  reducers: {
    list(state, { payload, type }) {
      return {
        ...state,
        list: {
          [type]: paginate(state.list[type], payload),
        },
      };
    },
    detail(state, action) {
      return {
        ...state,
      };
    },
  },
};
