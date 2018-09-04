import { shadow } from '../../../../utils/style';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {},
  switch: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 50,
      paddingHorizontal: 7,
    },
    content: {
      container: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        backgroundColor: 'white',
        marginHorizontal: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        ...shadow,
      },
      text: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    status: {
      text: {
        fontSize: 14,
        color: 'rgba(0, 0,0 ,0.65)',
      },
    },
    matched: {
      highlight: {
        color: '#0090FF',
      },
    },
  },
};
