import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import ProjectItem from './item';

const mock = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

@connect()
export default class FundProjectList extends Component {
  handleItemPress = item => () => {};

  renderHeader = () => (
    <View style={styles.header.container}>
      <Text style={styles.header.title}>
        {mock.length}
        个项目
      </Text>
    </View>
  );

  renderItem = ({ item }) => (
    <ProjectItem onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <List
          data={mock}
          renderHeader={this.renderHeader}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    container: {
      paddingVertical: 3,
      paddingHorizontal: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
  },
  separator: {
    marginLeft: 12,
    backgroundColor: '#E9E9E9',
    height: StyleSheet.hairlineWidth,
  },
};
