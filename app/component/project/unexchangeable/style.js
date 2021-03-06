import { raised, shadow } from '../../../utils/style';

export default {
  container: {
    paddingLeft: 10,
    paddingRight: 12,
    paddingVertical: 14,
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 4,
    ...shadow,
  },
  top: {
    container: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    group: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      container: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      text: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    status: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dot: {
        container: {
          height: 7,
          width: 7,
          borderRadius: 3.5,
          backgroundColor: '#7376F4',
          marginRight: 6,
        },
      },
      text: {
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: 13,
      },
    },
  },
  bottom: {
    container: {
      // flexDirection: 'row',
      marginTop: 18,
      // justifyContent: 'space-between',
    },
    contentContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    content: {
      color: '#666666',
      fontSize: 12,
    },
  },
};
