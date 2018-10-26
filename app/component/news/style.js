export default {
  container: {
    padding: 12,
  },
  label: {
    wrapper: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    container: {
      paddingHorizontal: 8,
      height: 20,
      justifyContent: 'center',
      backgroundColor: '#F1F1F1',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    text: {
      color: '#A3A3A3',
      fontSize: 11,
    },
  },
  title: {
    fontSize: 17,
    lineHeight: 26,
    color: 'black',
    fontWeight: 'bold',
  },
  subtitle: {
    container: {
      marginTop: 8,
    },
    text: {
      fontSize: 15,
      color: 'rgba(0, 0, 0, 0.65)',
      lineHeight: 26,
    },
  },
  date: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
    link: {
      color: '#1890FF',
    },
  },
};
