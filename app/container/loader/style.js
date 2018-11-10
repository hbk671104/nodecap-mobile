import { navBarHeight } from 'component/navBar';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
  },
  top: {
    container: {
      marginTop: 78 - navBarHeight,
      alignSelf: 'center',
      alignItems: 'center',
    },
    intro: {
      fontSize: 11,
      fontWeight: '100',
      color: 'rgba(0, 0, 0, 0.45)',
      marginTop: 13,
    },
    box: {
      marginVertical: 8,
    },
  },
  bottom: {
    marginBottom: 24,
    alignSelf: 'center',
  },
};
