import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';

import Group from './group';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '成员详情',
  name: 'App_UserProfileOperation',
})
@connect(({ login, loading }, props) => {
  const data = props.navigation.getParam('data');
  return {
    data,
  };
})
export default class InstitutionDetail extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  renderNavBar = () => (
    <NavBar
      back
      gradient
      renderBottom={() => (
        <Header {...this.props} onLinkPress={this.handleLinkPress} />
      )}
    />
  );

  render() {
    const { data, in_individual } = this.props;
    const desc = R.pathOr('', ['description'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {!!desc && (
            <Group title="个人简介">
              <View style={styles.desc.container}>
                <Text style={styles.desc.text}>{desc}</Text>
              </View>
            </Group>
          )}
        </ScrollView>
      </View>
    );
  }
}
