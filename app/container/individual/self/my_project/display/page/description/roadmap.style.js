import { StyleSheet, Dimensions } from 'react-native';

export default {
  container: {
    marginLeft: 4,
    paddingLeft: 15,
    paddingRight: 22,
    paddingBottom: 5,
    paddingTop: 10,
    borderLeftWidth: 1.5,
    borderLeftColor: '#E9E9E9',
    position: 'relative',
  },
  point: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e9e9e9',
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    left: -5,
    top: 16,
  },
  time: { fontSize: 13, color: 'rgba(0,0,0,0.45)' },
  content: { fontSize: 14, color: 'rgba(0,0,0,0.85)' },
};
