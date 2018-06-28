import React from 'react';
import { View, Image } from 'react-native';

import Input from '../uikit/textInput';
import styles from './style';

const searchBar = props => (
  <View style={[styles.container, props.style]}>
    <Input
      {...props}
      style={styles.input}
      placeholder="输入项目关键字搜索"
      placeholderTextColor="white"
      returnKeyType="search"
    />
    <View style={styles.icon.container}>
      <Image source={require('asset/search.png')} />
    </View>
  </View>
);

export default searchBar;
