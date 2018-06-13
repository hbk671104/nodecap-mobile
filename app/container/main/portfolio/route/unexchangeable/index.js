import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';

import List from 'component/uikit/list';
import UnexchangeableItem from 'component/project/unexchangeable';
import Header from './header';
import styles from './style';

@connect(({ portfolio, loading }) => ({
  data: R.pathOr([], ['unexchangeable', 'index', 'data'])(portfolio),
  pagination: R.pathOr({}, ['unexchangeable', 'index', 'pagination'])(portfolio),
  params: R.pathOr({}, ['unexchangeable', 'params'])(portfolio),
  loading: loading.effects['portfolio/index'],
}))
export default class Unexchangeable extends Component {
  state = {
    status: R.path(['params', 'status'])(this.props),
  };

  componentWillMount() {
    this.requestData();
  }

  requestData = () => {
    const { status } = this.state;
    this.props.dispatch({
      type: 'portfolio/index',
      payload: { status },
    });
  };

  handleSelect = (status) => {
    this.setState({ status }, this.requestData);
  };

  renderItem = ({ item }) => <UnexchangeableItem item={item} />;

  renderHeader = () => <Header value={this.state.status} onSelect={this.handleSelect} />;

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          style={styles.list}
          data={data}
          // loading={loading}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
