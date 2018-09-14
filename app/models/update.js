import R from 'ramda';

export default {
  namespace: 'update',
  state: {
    modal_visible: false,
  },
  effects: {},
  reducers: {
    toggle(state) {
      return {
        ...state,
        modal_visible: R.pipe(
          R.path(['modal_visible']),
          R.not,
        )(state),
      };
    },
  },
};
