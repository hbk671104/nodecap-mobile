import BigNumber from 'bignumber.js';

const padLeft = (string, bytes) => {
  let result = string;
  while (result.length < bytes * 2) {
    result = `0${result}`;
  }
  return `0x${result}`;
};

export const convertToETHAddress = iban => {
  const base36 = iban.substr(4);
  const asBn = new BigNumber(base36, 36);
  return padLeft(asBn.toString(16), 20);
};

export const parseIBAN = raw => {
  const result = raw.match(/([A-Z])\w+/);
  if (result) {
    const iban = result[0];
    return convertToETHAddress(iban);
  }
  return null;
};
