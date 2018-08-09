import { shadow } from '../../../../../utils/style';

export default {
  container: {
    paddingHorizontal: 12,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    marginRight: 10,
  },
  card: {
    margin: 0,
    padding: 0,
    borderRadius: 7,
    borderWidth: 0,
    ...shadow,
  },
};
