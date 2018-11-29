import Config from 'react-native-config';
import development from './development';
import staging from './staging';
import production from './production';

const envMap = {
  development,
  staging,
  production,
};

// export default (Config.ENV ? envMap[Config.ENV] : production);
export default development;
