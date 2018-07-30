import React from 'react';
import NodeCapIcon from 'component/icon/nodecap';

export const symbol = (b, style = {}) => {
  switch (b) {
    case 'USD':
    case 'USDT':
      return <NodeCapIcon style={style} name="tubiaozhizuomoban" />;
    case 'CNY':
      return <NodeCapIcon style={style} name="icomoon" />;
    case 'HT':
      return null;
    default:
      return <NodeCapIcon style={style} name={b} />;
  }
};
