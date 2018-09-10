// import { projectRecommendation, updateRecommendation } from '../services/api';

export default {
  namespace: 'public_project',
  state: {
    list: null,
    institution: null,
    report: null,
    current: null,
  },
  effects: {
    // *fetch({ callback }, { call, put }) {},
    // *fetchInstitution({ callback }, { call, put }) {},
    // *get({ callback, payload }, { call }) {},
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    institution(state, action) {
      return {
        ...state,
        institution: action.payload,
      };
    },
    report(state, action) {
      return {
        ...state,
        report: action.payload,
      };
    },
    clearReport(state, action) {
      return {
        ...state,
        report: null,
      };
    },
    current(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    clearCurrent(state, action) {
      return {
        ...state,
        current: null,
      };
    },
  },
};
