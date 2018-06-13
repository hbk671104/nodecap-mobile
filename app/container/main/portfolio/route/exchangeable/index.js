import React, { Component } from 'react';
import { View } from 'react-native';
import { compose, withState } from 'recompose';

import List from 'component/uikit/list';
import ProjectItem from 'component/project/item';
import PriceChangeItem from 'component/project/priceChangeItem';
import InvestmentItem from 'component/project/investmentItem';
import Header from './header';
import styles from './style';

@compose(withState('type', 'setType', 'balance'))
export default class Exchangeable extends Component {
  renderItem = ({ item }) => {
    switch (this.props.type) {
      case 'balance':
      case 'roi':
        return <ProjectItem item={item} />;
      case 'price_change':
        return <PriceChangeItem item={item} />;
      case 'investment':
        return <InvestmentItem item={item} />;
      default:
        return null;
    }
  };

  renderHeader = () => (
    <Header value={this.props.type} onSelect={type => this.props.setType(type)} />
  );

  render() {
    return (
      <View style={styles.container}>
        <List
          style={styles.list}
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
