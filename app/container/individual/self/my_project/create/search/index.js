import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import List from 'component/uikit/list';
import styles from './style';

@global.bindTrack({
  page: '创建项目搜索',
  name: 'App_CreateMyProjectSearchOperation',
})
@connect(({ user, login, loading }) => ({
  data: [],
  //   loading: loading.effects['login/switch'],
}))
class CreateMyProjectSearch extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleSavePress = () => {
    // this.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'CreateMyProject',
    //   }),
    // );
  };

  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="项目名称"
      renderRight={() => (
        <Touchable borderless onPress={this.handleSavePress}>
          <Text style={styles.navBar.right}>保存</Text>
        </Touchable>
      )}
    />
  );

  renderItem = ({ item }) => null;

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List data={data} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default CreateMyProjectSearch;
