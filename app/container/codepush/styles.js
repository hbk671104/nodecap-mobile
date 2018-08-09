import { realBarHeight } from 'component/navBar';

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
      marginTop: 100 - realBarHeight,
      alignItems: 'center',
    },
    intro: {
      fontSize: 11,
      fontWeight: '100',
      color: 'rgba(0, 0, 0, 0.45)',
      marginTop: 13,
    },
  },
  bar: {
    container: {
      marginTop: 145,
      alignItems: 'center',
      marginHorizontal: 60,
    },
    wrapper: {
      marginTop: 18,
      alignItems: 'center',
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 12,
    },
    highlight: {
      fontWeight: 'bold',
      color: '#1890FF',
    },
    content: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 12,
      lineHeight: 17,
      marginTop: 9,
      // textAlign: 'center',
    },
  },
};
