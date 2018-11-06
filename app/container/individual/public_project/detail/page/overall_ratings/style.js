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
      parent: {
        transform: [
          {
            rotate: '30deg',
          },
        ],
      },
    },
    area: {
      data: {
        fill: '#1890FF',
        fillOpacity: 0.8,
        stroke: 'none',
      },
    },
    dependentAxis: {
      axis: {
        stroke: 'none',
      },
      grid: {
        stroke: '#D7E4F0',
        strokeWidth: StyleSheet.hairlineWidth,
      },
    },
    axis: {
      axis: { stroke: '#B8CBDD', strokeWidth: StyleSheet.hairlineWidth },
      grid: {
        stroke: '#D7E4F0',
        strokeWidth: StyleSheet.hairlineWidth,
        strokeLinecap: 'round',
      },
      tickLabels: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 'bold',
        padding: 12,
        angle: -30,
      },
    },
  },
};
