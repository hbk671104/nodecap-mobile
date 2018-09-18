import { realBarHeight } from 'component/navBar';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 148.5,
    height: 23.5,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 130 - realBarHeight,
  },
  input: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 20,
    borderWidth: 0,
  },
  resetPwd: {
    container: {
      marginTop: 12,
      alignSelf: 'flex-end',
      marginRight: 32,
    },
    text: {
      fontSize: 14,
      color: '#1890FF',
    },
  },
  item: {
    title: {
      width: 60,
    },
  },
  smscode: {
    color: '#1890FF',
    fontSize: 14,
  },
  rightButton: {
    color: '#1890FF',
  },
};
