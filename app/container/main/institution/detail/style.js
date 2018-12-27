import { getBottomSpace } from 'react-native-iphone-x-helper';

export const bottomTabHeight = 55;
export const buttonPadding = bottomTabHeight + getBottomSpace() + 12;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  desc: {
    container: {
      marginTop: 5,
    },
    text: {
      color: '#4A4A4A',
      fontSize: 14,
      lineHeight: 21,
    },
  },
  claim: {
    container: {
      position: 'absolute',
      right: 0,
      bottom: 190,
    },
  },
  right: {
    container: {},
    text: {
      fontSize: 14,
      color: 'white',
    },
  },
  allReports: {
    height: 44,
  },
  allReportsText: {
    fontSize: 12,
    color: '#1890FF',
  },
};
