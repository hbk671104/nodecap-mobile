import store from '../../index';
import { NavigationActions } from 'react-navigation';

const handleOpen = ({ type, payload }) => {
  const { action_id: id } = JSON.parse(payload);
  switch (type) {
    case 'news':
      store.dispatch(
        NavigationActions.navigate({
          routeName: 'NotificationDetail',
          params: {
            id,
          },
        }),
      );
      break;
    default:
      break;
  }
};

const handleReceive = ({ type, payload }) => {
  const { action_id } = JSON.parse(payload);
  switch (type) {
    case 'news':
      store.dispatch({
        type: 'notification/fetch',
      });
      break;
    default:
      break;
  }
};

export { handleOpen, handleReceive };
