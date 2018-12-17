import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Item from 'component/self/item';
import SafeAreaView from 'component/uikit/safeArea';

import Button from '../component/button';
import styles from './style';

@global.bindTrack({
  page: '创建我的项目',
  name: 'App_MyProjectCreateOperation',
})
@connect(({ project_create }) => ({
  current: R.pathOr({}, ['current'])(project_create),
  query: R.pathOr([], ['query', 'data'])(project_create),
}))
class CreateProject extends Component {
  componentWillMount() {
    const { current } = this.props;
    if (R.has('id')(current)) {
      this.props.dispatch({
        type: 'project_create/resetCurrent',
      });
    }
  }

  componentDidMount() {
    this.props.track('进入');
  }

  handleProjectNamePress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyProjectSearch',
      }),
    );
  };

  handleNextPress = () => {
    const { query } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: R.isEmpty(query)
          ? 'CreateMyProjectBasicInfo'
          : 'CreateMyProjectNormal',
      }),
    );
  };

  render() {
    const { current } = this.props;
    const name = R.pathOr('', ['name'])(current);
    return (
      <SafeAreaView style={styles.container}>
        <NavBar back barStyle="dark-content" title="创建项目" />
        <ScrollView>
          <Item
            style={styles.item.container}
            titleContainer={styles.item.title.container}
            titleStyle={styles.item.title.text}
            title="项目名称"
            renderRight={() => (
              <View style={styles.item.content.container}>
                <Text style={styles.item.content.text}>{name}</Text>
              </View>
            )}
            onPress={this.handleProjectNamePress}
          />
          <View style={styles.divider} />
        </ScrollView>
        <Button
          disabled={R.isEmpty(name)}
          title="下一步"
          onPress={this.handleNextPress}
        />
      </SafeAreaView>
    );
  }
}

export default CreateProject;
