/**
 * NodeCapIcon icon set component.
 * Usage: <NodeCapIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "coin": 59022,
  "qiehuan": 59125,
  "icomoon": 58892,
  "duihao": 58994,
  "weibiaoti3-copy": 58891,
  "ai-briefcase": 58916,
  "ziyuanku": 59150,
  "chengbenguanli": 59051,
  "user": 58898,
  "mail": 58928,
  "qiehuan-xue": 58914,
  "mingxi": 59367,
  "ethzitijiacu": 58904,
  "paiming": 58930,
  "tubiaozhizuomoban": 58896,
  "ETH": 58889,
  "dashboardx": 58925,
  "jiage": 58958,
  "EOS": 58906,
  "qushi1": 58929,
  "add-member": 58881,
  "BTC": 58905,
  "Shape": 58883,
  "investment": 58884,
  "biaoqian": 58882,
  "biaoqianku-jiantou": 58885,
  "xitongshezhi": 58886,
  "yonghuguanli": 58887,
  "banbengengxin": 58888,
  "EOS1": 58890,
  "gengxin": 58893,
  "touzihuibaoshuai": 58894,
  "shenqiqiehuan": 58895,
  "qushi": 58897,
  "mingxi1": 58899,
  "touzi": 58900,
  "lirun": 58901,
  "dangexiangmubili": 58902,
  "xiangmuzhuangtai": 58903,
  "daigenjin": 58907,
  "daichushai": 58908,
  "touzihuibaoshuai-copy": 59368,
  "vol": 58909,
  "high": 58910,
  "jinse": 58911,
  "xiajiangqushi": 58912
};

const iconSet = createIconSet(glyphMap, 'iconfont', 'NodeCapIcon.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

