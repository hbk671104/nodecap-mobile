import { StyleSheet } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    container: {
      height: 40,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E7E7E7',
      backgroundColor: 'white',
    },
    tab: {
      height: 40,
      paddingBottom: 0,
      alignItems: 'center',
      paddingHorizontal: 20,
      flexDirection: 'row',
      position: 'relative',
    },
    hot: {
      height: 15,
      marginRight: 5,
      marginBottom: 2,
      resizeMode: 'contain',
    },
    text: {
      fontSize: 14,
    },
    underline: {
      height: 0,
    },
    under: {
      height: 3,
      position: 'absolute',
      bottom: 4,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    underInner: {
      width: 25,
      height: 3,
      borderRadius: 3,
      backgroundColor: '#1890FF',
    },
  },
  searchBar: {
    container: {
      flex: 1,
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
  listContainer: {
    paddingVertical: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 76,
  },
  header: {
    height: 45,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9',
  },
  headerText: { fontSize: 14, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.17 },
  headerHighlight: { fontSize: 14, color: '#1890FF', letterSpacing: 0.17 },
};
