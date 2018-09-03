import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import AuthButton from 'component/auth/button';
import List from 'component/uikit/list';

import RecommendationItem from './item';
import styles from './style';

@connect(({ recommendation, loading }) => ({
  data: R.pathOr(
    [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
    ['list'],
  )(recommendation),
  loading: loading.effects['recommendation/fetch'],
}))
class Recommendation extends Component {
  state = {
    selected: {},
  };

  componentWillUnmount() {
    this.props.dispatch({
      type: 'recommendation/clearList',
    });
  }

  requestData = () => {
    this.props.dispatch({
      type: 'recommendation/fetch',
    });
  };

  handleSkip = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    );
  };

  handleSubmit = () => {};

  handleItemPress = id => () => {
    this.setState(({ selected }) => {
      const updateSelected = {
        ...selected,
        [id]: !R.pathOr(false, [id])(selected),
      };
      return { selected: updateSelected };
    });
  };

  renderHeader = () => (
    <View style={styles.header.container}>
      <View style={styles.header.top.container}>
        <Text style={styles.header.top.title}>添加感兴趣的项目</Text>
        <Touchable borderless onPress={this.handleSkip}>
          <Text style={styles.header.top.skip}>跳过</Text>
        </Touchable>
      </View>
      <View style={styles.header.subtitle.container}>
        <Text style={styles.header.subtitle.text}>精选私家好项目</Text>
      </View>
    </View>
  );

  renderItem = ({ item }) => (
    <RecommendationItem
      data={item}
      selected={!!this.state.selected[item.id]}
      onPress={this.handleItemPress(item.id)}
    />
  );

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar hidden barStyle="dark-content" />
        {this.renderHeader()}
        <List
          action={this.requestData}
          loading={loading}
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
        />
        <AuthButton
          style={styles.authButton.container}
          disabled={false}
          title="开始体验"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default Recommendation;
