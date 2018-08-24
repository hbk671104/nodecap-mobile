export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tab: {
    container: {
      borderBottomWidth: 0,
      height: undefined,
    },
    underline: {
      height: 3,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      bottom: 12,
    },
    item: {
      container: {
        height: 60,
        justifyContent: 'center',
        marginHorizontal: 11,
      },
      title: {
        fontSize: 14,
        color: '#666666',
      },
      highlight: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1890FF',
      },
    },
  },
};
