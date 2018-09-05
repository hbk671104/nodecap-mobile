import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import AuthButton from 'component/auth/button';
import List from 'component/uikit/list';

import { Storage } from '../../../utils';
import RecommendationItem from './item';
import styles from './style';

@connect(({ recommendation, loading }) => ({
  data: R.pathOr([], ['list'])(recommendation),
  fetching: loading.effects['recommendation/fetch'],
  updating: loading.effects['recommendation/update'],
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

  handleNext = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    );
    Storage.set('project_recommended', true);
  };

  handleSubmit = () => {
    this.props.dispatch({
      type: 'recommendation/update',
      payload: R.pipe(
        R.path(['selected']),
        R.keys,
        R.map(k => parseInt(k, 10)),
      )(this.state),
      callback: success => {
        if (success) {
          this.handleNext();
        }
      },
    });
  };

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
        <Touchable borderless onPress={this.handleNext}>
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
    const { data, fetching, updating } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.container}>
        <NavBar hidden barStyle="dark-content" />
        {this.renderHeader()}
        <List
          action={this.requestData}
          loading={fetching}
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
        />
        <AuthButton
          loading={updating}
          style={styles.authButton.container}
          disabled={R.isEmpty(selected)}
          title="开始体验"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default Recommendation;
