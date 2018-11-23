import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1890FF',
  },
  navBar: {
    wrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
    container: {
      backgroundColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    title: {
      color: 'white',
    },
  },
  explanation: {
    container: {
      borderRadius: 2,
      width: 270,
      height: 150,
      backgroundColor: 'white',
    },
    content: {
      container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 22,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
      },
      text: {
        color: '#333333',
        fontSize: 13,
        lineHeight: 18,
        marginTop: 10,
      },
    },
    bottom: {
      container: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#DDDDDD',
      },
      text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1890FF',
      },
    },
  },
  avatarUpload: {
    container: {
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
      marginTop: 22,
    },
    subtitle: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
      marginTop: 12,
    },
  },
};
