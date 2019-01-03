import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  accessory: {
    container: {
      paddingVertical: 8,
    },
    group: {
      container: {
        marginHorizontal: 12,
      },
      image: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        backgroundColor: '#F5F5F5',
      },
      title: {
        marginTop: 12,
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
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
    misc: {
      container: {
        height: 45,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E9E9E9',
        paddingHorizontal: 12,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
        marginLeft: 8,
      },
      box: {
        container: {
          height: 18,
          width: 30.5,
          borderRadius: 1,
          backgroundColor: '#E5F3FF',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 4,
        },
        text: {
          fontSize: 11,
          color: '#1890FF',
        },
      },
      press: {
        fontSize: 13,
        color: '#1890FF',
      },
    },
    bottom: {
      container: {
        height: 45,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E9E9E9',
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
