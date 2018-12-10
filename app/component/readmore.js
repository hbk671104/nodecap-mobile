import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'component/uikit/icon';

const readmore = ({ collapsed = true, onPress }) => (
  <View style={styles.container}>
    <Text style={styles.text} onPress={onPress}>
      {collapsed ? '查看更多' : '收起'}{' '}
      <Icon name={`arrow-${collapsed ? 'down' : 'up'}`} />
    </Text>
  </View>
);

const styles = {
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    color: '#1890FF',
    fontWeight: 'bold',
  },
};

export default readmore;
