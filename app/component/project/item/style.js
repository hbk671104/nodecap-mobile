import { raised, shadow } from '../../../utils/style';

export default {
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 4,
    ...shadow,
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      color: '#333333',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    subtitle: {
      fontSize: 12,
      fontWeight: 'normal',
      color: '#999999',
    },
    ranking: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1890FF',
    },
  },
  middle: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
    title: {
      fontSize: 11,
      color: '#999999',
    },
    content: {
      marginTop: 5,
      fontWeight: 'bold',
    },
    up: {
      color: '#09AC32',
    },
    down: {
      color: '#F5222D',
    },
  },
  bottom: {
    container: {
      marginTop: 20,
    },
    group: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 11,
      color: '#999999',
    },
    content: {
      fontSize: 13,
      color: '#666666',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    label: {
      container: {
        height: 16,
        borderRadius: 2,
        paddingHorizontal: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 11,
        color: 'white',
      },
      up: {
        backgroundColor: '#09AC32',
      },
      down: {
        backgroundColor: '#F5222D',
      },
    },
  },
};
