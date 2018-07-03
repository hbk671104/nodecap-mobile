import React from 'react';
import { Text } from 'react-native';
import Accounting from 'accounting';

const amount = ({ children }) => {
  let comp = Accounting.formatNumber(children);
  if (children > 100000000) {
    const num = children / 100000000;
    comp = `${Accounting.formatNumber(num)}亿`;
  }
  if (children > 10000) {
    const num = children / 10000;
    comp = `${Accounting.formatNumber(num, 1)}万`;
  }
  return <Text>{comp}</Text>;
};

export default amount;
