import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

import List from 'component/uikit/list';

import CommitItem from './component/commit';
import styles from './style';

class CommitList extends Component {
  renderItem = ({ item, index }) => <CommitItem data={item} index={index} />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Flex style={styles.tableHead}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tableHeadText}>排名</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.tableHeadText}>项目</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.tableHeadText}>Commit（每周更新）</Text>
          </View>
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

export default CommitList;
