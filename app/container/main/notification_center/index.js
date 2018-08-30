import React, { Component } from 'react';
import { View } from 'react-native';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import NotificationItem from 'component/notification/item';

import styles from './style';

const mock = [
  {
    id: 1,
    name: 'haha',
  },
  {
    id: 2,
    name: 'haha',
  },
  {
    id: 3,
    name: 'haha',
  },
  {
    id: 4,
    name: 'haha',
  },
];

export default class NotificationCenter extends Component {
  renderItem = ({ item }) => <NotificationItem data={item} />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient title="项目动态" />
        <List
          data={mock}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
