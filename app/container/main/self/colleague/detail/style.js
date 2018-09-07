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
    bottom: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 168,
      },
      wrapper: {
        alignItems: 'center',
      },
      title: {
        container: {
          marginTop: 15,
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
        },
      },
    },
  },
  item: {
    container: {},
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.45)',
      width: 60,
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
