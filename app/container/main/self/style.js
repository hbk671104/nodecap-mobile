import { realBarHeight } from 'component/navBar';
import { headerHeight } from './header';

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    title: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
    bottom: {
      height: 64,
    },
  },
  header: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: realBarHeight + 64 - headerHeight / 2,
  },
};
