import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { compose, withState } from 'recompose';

import List from 'component/uikit/list';
import UnexchangeableItem from 'component/project/unexchangeable';
import Header from './header';
import styles from './style';

@compose(withState('type', 'setType', '4,5,6'))
export default class Unexchangeable extends Component {
  renderItem = ({ item }) => <UnexchangeableItem item={item} />;

  renderHeader = () => (
    <Header value={this.props.type} onSelect={type => this.props.setType(type)} />
  );

  render() {
    return (
      <View style={styles.container}>
        <List
          style={styles.list}
          data={[1, 2, 3]}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
