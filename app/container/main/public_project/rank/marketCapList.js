import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import styles from './style';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import bind from 'lodash-decorators/bind';
import R from 'ramda';

class MarketCapList extends Component {
  @bind
  renderItem({ item, index }) {
    const id = R.path(['coin-link', 'id'])(item);
    const ele = (
      <View>
        <Flex style={styles.item}>
          <View style={[styles.rank, { width: 60 }]}>
            <Text style={styles.index}>{item.rank}</Text>
          </View>
          <View style={[styles.coin, { flex: 1 }]}>
            <Text style={styles.coinText}>{item.token_name}</Text>
          </View>
          <View style={[styles.price, { width: 118 }]}>
            <Text style={styles.flatPrice}>{item.market_value}</Text>
          </View>
        </Flex>
      </View>
    );
    return ele;
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Flex style={styles.tableHead}>
          <Text style={[styles.tableHeadText, { width: 60 }]}>排名</Text>
          <Text style={[styles.tableHeadText, { flex: 1 }]}>币种</Text>
          <Text style={[styles.tableHeadText, { width: 118 }]}>市值</Text>
        </Flex>
        <List
          action={this.props.action}
          loading={this.props.loading}
          data={this.props.data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default MarketCapList;
