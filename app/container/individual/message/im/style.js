import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    wrapper: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    title: {
      container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 36,
      },
      text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
      },
      subtext: {
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
    bottom: {
      container: {
        height: 45,
        flexDirection: 'row',
      },
      divider: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#E9E9E9',
      },
      group: {
        container: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: 13,
          color: 'rgba(0, 0, 0, 0.85)',
          marginLeft: 12,
        },
      },
    },
  },
};
