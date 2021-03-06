export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    right: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      group: {
        container: {
          marginLeft: 15,
        },
        title: {
          color: 'white',
        },
      },
    },
  },
  item: {
    container: {},
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.45)',
      width: 48,
    },
    content: {
      container: {
        alignSelf: 'flex-start',
      },
      text: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
  },
  typesContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
};
