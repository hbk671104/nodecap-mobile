import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    right: {
      color: 'white',
      fontSize: 14,
    },
  },
  selector: {
    container: {
      paddingLeft: 0,
    },
    title: {
      fontSize: 18,
    },
    subtitle: {
      fontSize: 12,
    },
    item: {
      container: {
        width: width / 3 - 24,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: '#F5F5F5',
        borderWidth: 0,
      },
      highlight: {
        backgroundColor: '#E5F3FF',
      },
    },
  },
};
