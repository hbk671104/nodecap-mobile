import React from 'react';
import { Image, Text, Platform } from 'react-native';

export const raised = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(0,0,0, .4)',
      shadowOffset: { height: 3, width: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    android: {
      elevation: 4,
    },
  }),
};

export const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(44, 64, 83, 0.1)',
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.7,
    },
    android: {
      elevation: 2,
    },
  }),
};

export const medalMap = index => {
  switch (index) {
    case 0:
      return <Image source={require('asset/medal/gold.png')} />;
    case 1:
      return <Image source={require('asset/medal/silver.png')} />;
    case 2:
      return <Image source={require('asset/medal/brown.png')} />;
    default:
      return (
        <Text style={{ fontSize: 12, color: '#999999' }}>#{index + 1}</Text>
      );
  }
};

export const iconMap = name => {
  switch (name) {
    case 'BTC':
      return <Image source={require('asset/crypto/BTC.png')} />;
    case 'ETH':
      return <Image source={require('asset/crypto/ETH.png')} />;
    case 'EOS':
      return <Image source={require('asset/crypto/EOS.png')} />;
    case 'USDT':
      return <Image source={require('asset/crypto/USDT.png')} />;
    default:
      return null;
  }
};
