export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    container: {
      paddingTop: 25,
      paddingBottom: 16,
      paddingLeft: 20,
      paddingRight: 12,
    },
    top: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        flex: 1,
        fontSize: 26,
        fontWeight: 'bold',
      },
      skip: {
        fontSize: 14,
        color: '#1890FF',
      },
    },
    subtitle: {
      container: {
        marginTop: 12,
      },
      text: {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 12,
      },
    },
  },
  authButton: {
    container: {
      marginHorizontal: 24,
      marginVertical: 24,
    },
  },
};
