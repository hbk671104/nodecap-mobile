import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { compose, withState } from 'recompose';

import List from 'component/uikit/list';
import ProjectItem from 'component/project/item';
import Header from './header';
import styles from './style';

@compose(withState('type', 'setType', 'balance'))
export default class Exchangeable extends Component {
  renderItem = ({ item }) => <ProjectItem item={item} />;

  renderHeader = () => (
    <Header value={this.props.type} onSelect={type => this.props.setType(type)} />
  );

  render() {
    return (
      <View style={styles.container}>
        <List
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
