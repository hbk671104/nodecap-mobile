import { mainColor, borderColor } from 'component/uikit/color';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 29,
    color: '#333333',
    letterSpacing: 0.35,
    marginBottom: 10,
  },
  header: {
    container: {
      paddingTop: 22,
      paddingHorizontal: 22,
      backgroundColor: 'white',
      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    tokenName: {
      fontFamily: 'PingFangSC-Medium',
      fontSize: 14,
      color: '#666666',
      letterSpacing: 0.17,
      marginTop: 5,
    },
    descContainer: {
      flex: 1,
      marginTop: 9,
    },
    desc: {
      color: '#666666',
    },
    moreText: {
      color: mainColor,
    },
    link: {
      color: mainColor,
      flex: 1,
      textAlign: 'center',
      height: 42,
      lineHeight: 42,
    },
    links: {
      flex: 1,
      marginTop: 10,
    },
    division: {
      width: 1,
      height: 15,
      borderRightWidth: 1,
      borderRightColor: borderColor,
      marginTop: 4,
    },
  },
};
