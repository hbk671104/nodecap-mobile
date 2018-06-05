import React, { Component } from 'react';
import { View, Text } from 'react-native';

import List from 'component/uikit/list';
import styles from './style';

export default class Unexchangeable extends Component {
  renderItem = ({ item }) => <Text>{item}</Text>;

  render() {
    return (
      <View style={styles.container}>
        <List
          data={[1, 2, 3]}
          renderItem={this.renderItem}
          onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
