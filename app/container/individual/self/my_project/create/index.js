import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Item from 'component/self/item';

import Button from '../component/button';
import styles from './style';

@global.bindTrack({
  page: '创建我的项目',
  name: 'App_MyProjectCreateOperation',
})
@connect(({ user, login, loading }) => ({
  data: [],
  //   loading: loading.effects['login/switch'],
}))
class CreateProject extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleProjectNamePress = () => {};

  handleNextPress = () => {};

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient title="创建项目" />
        <ScrollView>
          <Item
            style={styles.item.container}
            titleContainer={styles.item.title.container}
            titleStyle={styles.item.title.text}
            title="项目名称"
            onPress={this.handleProjectNamePress}
          />
          <View style={styles.divider} />
        </ScrollView>
        <Button title="下一步" onPress={this.handleNextPress} />
      </View>
    );
  }
}

export default CreateProject;
