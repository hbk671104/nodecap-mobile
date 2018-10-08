import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    paddingTop: 21,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    color: 'rgba(0,0,0,0.85)',
    fontWeight: 'bold',
  },
  desc: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#4A4A4A',
    letterSpacing: 0.31,
    lineHeight: 18,
  },
  more: {
    color: '#0090FF',
  },
  site: {
    marginTop: 20,
  },
  ratingTitle: {
    marginTop: 5,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  ratingTitleText: {
    color: 'rgba(0, 0, 0, 0.85)',
  },
  ratingItemText: {
    color: '#1890FF',
    fontWeight: 'bold',
  },
  ratingItem: {
    marginTop: 10,
  },
  link: {
    color: '#0090FF',
  },
  tip: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
};
