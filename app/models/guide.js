import R from 'ramda';

const guideMap = {
  home: require('asset/guide/home.jpg'),
};
export default {
  namespace: 'guide',
  state: {
    modal_visible: false,
    image: null,
    steps: {
      home: false,
      index: false,
      filter: false,
      chat: false,
    },
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
        image: R.path(['image'])(payload),
        steps: {
          ...state.steps,
          [R.path(['image'])(payload)]: true,
        },
      };
    },
  },
};
