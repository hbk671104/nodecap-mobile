import { realBarHeight } from 'component/navBar';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginHorizontal: 38,
  },
  button: {
    marginTop: 50,
    marginHorizontal: 40,
    borderWidth: 0,
  },
  titleWrapper: {
    marginTop: 128 - realBarHeight,
    marginHorizontal: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '200',
    // textAlign: 'center',
  },
  tip: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: '300',
    color: 'rgba(0, 0, 0, .45)',
  },
};
