import {
  createStackNavigator,
} from 'react-navigation';
import SMS from './sms';
import Password from './password';

const Login = createStackNavigator(
  {
    SMS: {
      screen: SMS,
      path: 'login/sms',
    },
    PasswordLogin: {
      screen: Password,
      path: 'login/password',
    },
  },
  {
    headerMode: 'none',
  },
);


export default Login;
