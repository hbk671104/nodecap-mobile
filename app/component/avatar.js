import React, { Component } from 'react';
import { View, Image } from 'react-native';

const style = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 4,
  shadowColor: '#000000',
  shadowOpacity: 0.2,
  resizeMode: 'contain',
};

export default function Avatar({ url, size = 'md' }) {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
  };
  const dimension = typeof size === 'number' ? size : sizeMap[size];
  return (
    <View style={style}>
      <Image
        source={{ uri: url }}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        }}
      />
    </View>
  );
}

