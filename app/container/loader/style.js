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
      marginTop: 100 - realBarHeight,
      alignSelf: 'center',
      alignItems: 'center',
    },
  },
};
