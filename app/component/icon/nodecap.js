/**
 * NodeCapIcon icon set component.
 * Usage: <NodeCapIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';

const glyphMap = {
  bingtu: 59035,
  icomoon: 58893,
  qianbi: 58917,
  orderup: 58885,
  diannao: 58894,
  chakan: 59011,
  tubiaozhizuomoban: 58896,
  ETH: 58889,
  kefu: 58920,
  dashboardx: 58925,
  xiala: 58948,
  invisible: 58930,
  qushi1: 58929,
  guanbi: 59012,
  BTC: 58912,
  investment: 58884,
  tianjia: 58913,
  lightbulb: 58982,
  sousuo: 58914,
  qushi: 58890,
  touzi: 58891,
  lirun: 58892,
  xiajiangqushi: 58916,
  bitebi: 58898,
  jifen: 58899,
  'lunbo-weixuanzhong': 58900,
  duihao: 58902,
  xiala1: 58903,
  qiehuan: 58904,
  shangsheng: 58905,
  dashboard: 58906,
  yitouxiangmu: 58907,
  'lunbo-xuanzhong': 58908,
  ethicon: 58909,
  TOP: 58910,
  touzijine: 58911,
  'touzi-': 58915,
  fenxiang: 58918,
  'hotnode-white': 58919,
  shouqijiantou: 58921,
  zhankaijiantou: 58922,
};

const iconSet = createIconSet(glyphMap, 'iconfont', 'NodeCapIcon.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

