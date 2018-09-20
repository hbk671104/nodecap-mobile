import Config from 'react-native-config';
import development from './development';
import staging from './staging';
import production from './production';

const runtimeConfig = Config.API_URL === 'http://101.132.167.95/v1' ? (global.__DEV__ ? development : staging) : production;

export default {
  ...Config,
  ...runtimeConfig,
};

