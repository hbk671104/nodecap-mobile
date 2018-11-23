import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    paddingTop: 21,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    fontWeight: 'bold',
  },
  titleWrap: {
    marginBottom: 12,
  },
  fieldGroup: {
    marginBottom: 26,
  },
  correction: { fontSize: 12, color: '#6C98C0', letterSpacing: 0.29 },
  desc: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    lineHeight: 22,
  },
  readmore: {
    container: {
      marginTop: 10,
      alignItems: 'center',
    },
    text: {
      color: '#1890FF',
      fontWeight: 'bold',
    },
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
