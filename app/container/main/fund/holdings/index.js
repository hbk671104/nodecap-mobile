import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Group from '../components/holdingItem/group';
import Item from '../components/holdingItem';
import styles from './style';

class FundHoldings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Group title="剩余可投">
            <Item />
            <Item />
            <Item />
          </Group>
          <Group title="已出货部分">
            <Item />
            <Item />
            <Item />
          </Group>
          <Group title="当前持有">
            <Item />
            <Item />
            <Item />
          </Group>
        </ScrollView>
      </View>
    );
  }
}

export default FundHoldings;
