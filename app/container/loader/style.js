import { realBarHeight } from 'component/navBar';

export default {
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  top: {
    container: {
      marginTop: 140 - realBarHeight,
      alignSelf: 'center',
      alignItems: 'center',
    },
    intro: {
      fontSize: 11,
      fontWeight: '100',
      color: 'rgba(0, 0, 0, 0.45)',
      marginTop: 13,
    },
  },
};
