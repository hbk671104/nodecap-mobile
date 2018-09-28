import { realBarHeight } from 'component/navBar';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
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
  bottom: {
    container: {
      marginBottom: 68.5,
    },
    login: {
      marginHorizontal: 40,
    },
    createCompany: {
      marginHorizontal: 40,
      marginTop: 22,
      backgroundColor: 'white',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#1890FF',
    },
    titleStyle: {
      color: '#1890FF',
    },
  },
};
