import { StyleSheet } from 'react-native';

export default {
  container: {},
  title: {
    container: {
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    score: {
      fontSize: 23,
      color: '#1890FF',
      fontWeight: 'bold',
      marginLeft: 15,
    },
  },
  chart: {
    container: {
      // labels: { fontSize: 12 },
      // parent: { border: '1px solid #ccc' },
    },
    area: {
      data: {
        fill: '#1890FF',
        fillOpacity: 0.8,
        stroke: 'none',
      },
    },
    axis: {
      axis: { stroke: '#B8CBDD', strokeWidth: StyleSheet.hairlineWidth },
      tickLabels: {
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 'bold',
        padding: 12,
      },
    },
  },
};
