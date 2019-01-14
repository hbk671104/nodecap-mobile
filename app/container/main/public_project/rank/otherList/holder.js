import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';

import styles from './style';

class CommitList extends Component {
  renderItem = ({ item, index }) => {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Flex style={styles.tableHead}>
          <Text style={[styles.tableHeadText, { flex: 1 }]}>排名</Text>
          <Text style={[styles.tableHeadText, { flex: 2 }]}>持币数量</Text>
          <Text style={[styles.tableHeadText, { flex: 3 }]}>地址</Text>
        </Flex>
        <List
          action={this.props.action}
          loading={this.props.loading}
          pagination={this.props.pagination}
          data={this.props.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default CommitList;
