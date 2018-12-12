import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listContent: {
    paddingVertical: 0,
  },
  categoryTitle: {
    container: {
      paddingHorizontal: 12,
      marginTop: 20,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
  divider: {
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  tableHead: {
    marginTop: 8,
    paddingHorizontal: 12,
    height: 27,
    backgroundColor: '#F5F5F5',
  },
  tableHeadText: { fontSize: 12, color: '#666666', letterSpacing: 0.14 },
};
