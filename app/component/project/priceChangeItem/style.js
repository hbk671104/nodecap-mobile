import { raised, shadow } from '../../../utils/style';

export default {
  container: {
    paddingLeft: 10,
    paddingRight: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginHorizontal: 12,
    borderRadius: 4,
    ...shadow,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    group: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      container: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: 'white',
        ...raised,
      },
      image: {
        height: 17.5,
        width: 17.5,
      },
    },
    title: {
      container: {
        marginLeft: 10,
      },
      text: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    subtitle: {
      fontSize: 11,
      fontWeight: 'normal',
      color: '#999999',
    },
  },
  middle: {
    container: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#09AC32',
    },
    label: {
      marginTop: 3,
      fontSize: 11,
      color: '#999999',
    },
    content: {
      fontSize: 12,
      color: '#666666',
    },
    roi: {
      marginTop: 3,
      fontSize: 11,
      color: '#09AC32',
      fontWeight: 'bold',
    },
  },
  right: {
    container: {
      // flex: 1,
      marginRight: 24,
    },
    wrapper: {
      height: 27,
      paddingHorizontal: 8,
      borderRadius: 2,
      backgroundColor: '#09AC32',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  ranking: {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    label: {
      fontSize: 12,
      color: '#999999',
    },
  },
};
