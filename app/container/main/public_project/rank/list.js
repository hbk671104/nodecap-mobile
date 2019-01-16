import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import styles from './style';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import bind from 'lodash-decorators/bind';
import R from 'ramda';

class RankList extends Component {
  @bind
  renderItem({ item, index }) {
    const id = R.path(['coin-link', 'id'])(item);
    const ele = (
      <View>
        <Flex style={styles.item}>
          <View style={[styles.rank, { width: 60 }]}>
            <Text style={styles.index}>{index + 1}</Text>
          </View>
          <View style={[styles.coin, { width: 111 }]}>
            <Text style={styles.coinText}>{item.coin}</Text>
          </View>
          <View style={[styles.price, { width: 118 }]}>
            <Text style={styles.flatPrice}>{item.fiat_price}</Text>
          </View>
          <View style={[styles.change_percent, { flex: 1 }]}>
            <Flex align="start">
              <View>
                {this.props.type === 'up' && (
                  <Image
                    style={styles.tip}
                    source={require('asset/rank/up.png')}
                  />
                )}
                {this.props.type === 'down' && (
                  <Image
                    style={styles.tip}
                    source={require('asset/rank/down.png')}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.percent,
                  {
                    color: this.props.type === 'up' ? '#09AC32' : '#F55454',
                  },
                ]}
              >
                {item.change_percent}%
              </Text>
            </Flex>
          </View>
        </Flex>
      </View>
    );
    if (id) {
      return (
        <Touchable onPress={() => this.props.toCoinDetail(id)}>{ele}</Touchable>
      );
    } else {
      return ele;
    }
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Flex style={styles.tableHead}>
          <Text style={[styles.tableHeadText, { width: 60 }]}>排名</Text>
          <Text style={[styles.tableHeadText, { width: 111 }]}>币种</Text>
          <Text style={[styles.tableHeadText, { width: 118 }]}>价格</Text>
          <Text style={[styles.tableHeadText, { flex: 1 }]}>涨幅</Text>
        </Flex>
        <List
          action={this.props.action}
          loading={this.props.loading}
          pagination={this.props.pagination}
          data={this.props.data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

RankList.propTypes = {};
RankList.defaultProps = {};

export default RankList;
