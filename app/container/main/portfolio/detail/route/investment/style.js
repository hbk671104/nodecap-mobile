import { mainColor, borderColor } from 'component/uikit/color';
import { shadow } from '../../../../../../utils/style';

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
      ...shadow,
    },
    tokenName: {
      fontFamily: 'PingFangSC-Medium',
      fontSize: 14,
      color: '#666666',
      letterSpacing: 0.17,
      marginTop: 5,
    },
    descContainer: {
      // flex: 1,
      marginTop: 9,
    },
    desc: {
      color: '#666666',
      fontSize: 13,
      lineHeight: 18,
    },
    moreText: {
      color: mainColor,
      fontSize: 13,
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
  base: {
    container: {
      marginTop: 18,
    },
    verticalField: {
      height: 'auto',
      paddingVertical: 11,
    },
    field: {
      height: 45,
      marginLeft: 22,
      borderBottomWidth: 0.5,
      borderBottomColor: borderColor,
      justifyContent: 'center',
      paddingRight: 15,
    },
    fieldName: {
      color: '#999999',
    },
    fieldValue: {
      color: '#333333',
    },
  },
};
