import { raised, shadow } from '../../../utils/style';

export default {
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
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
    },
    title: {
      fontSize: 11,
      color: '#999999',
    },
    up: {
      color: '#09AC32',
    },
    down: {
      color: '#F5222D',
    },
  },
  bottom: {
    container: {},
    title: {
      fontSize: 11,
      color: '#999999',
    },
    content: {
      fontSize: 13,
      color: '#666666',
      fontWeight: 'bold',
    },
  },
};
