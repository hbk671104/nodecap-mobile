import R from 'ramda';

export default {
  namespace: 'update',
  state: {
    modal_visible: false,
    release_notes: null,
  },
  effects: {},
  reducers: {
    toggle(state, { payload }) {
      return {
        ...state,
        modal_visible: R.pipe(
          R.path(['modal_visible']),
          R.not,
        )(state),
        release_notes: R.path(['releaseNotes'])(payload),
      };
    },
  },
};
