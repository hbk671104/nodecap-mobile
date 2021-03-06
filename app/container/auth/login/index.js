import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SMS from './sms';
import Password from './password';
import ResetPwd from '../resetPwd';
import SetPassword from '../setPassword';
import Recommendation from '../recommendation';
import RealnameInput from '../realnameInput';

const Base = createSwitchNavigator({
  SMS: {
    screen: SMS,
    path: 'login/sms',
  },
  Password: {
    screen: Password,
    path: 'login/password',
  },
  SetPassword: {
    screen: SetPassword,
    path: 'login/setPassword',
  },
  Recommendation,
  RealnameInput,
});

const Login = createStackNavigator(
  {
    Base,
    ResetPwd: {
      screen: ResetPwd,
      path: 'login/resetPassword',
    },
  },
  {
    headerMode: 'none',
  },
);

export default Login;
