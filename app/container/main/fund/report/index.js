import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import ReportItem from '../components/reportItem';
import styles from './style';

const mock = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

@connect()
export default class Report extends Component {
  handleItemPress = item => () => {};

  renderItem = ({ item }) => (
    <ReportItem onPress={this.handleItemPress(item)} />
  );

  render() {
    return (
      <View style={styles.container}>
        <List data={mock} renderItem={this.renderItem} />
      </View>
    );
  }
}
