import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import FavorItem from 'component/favored/item';

import Group from './partials/group';
import Member from './partials/member';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '机构编辑详情',
  name: 'App_MyInstitutionDetailOperation',
})
@connect(({ institution_create }) => ({
  data: R.pathOr({}, ['current'])(institution_create),
}))
export default class MyInstitutionDetail extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'institution_create/resetCurrent',
    });
  }

  handleLinkPress = uri => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WebPage',
        params: {
          title: R.pathOr('机构主页', ['data', 'name'])(this.props),
          uri,
        },
      }),
    );
  };

  handleEditPress = routeName => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    );
  };

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
    const { data } = this.props;
    const desc = R.pathOr('', ['description'])(data);
    const members = R.pathOr([], ['members'])(data);
    const coins = R.pathOr([], ['coins'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          <Group
            title="机构简介"
            onEditPress={this.handleEditPress('CreateMyInstitutionDescription')}
          >
            <View style={styles.desc.container}>
              <Text style={styles.desc.text}>{desc}</Text>
            </View>
          </Group>
          <Group
            title="机构成员"
            onEditPress={this.handleEditPress('CreateMyInstitutionTeam')}
          >
            {R.map(m => <Member key={m.id} data={m} />)(members)}
          </Group>
          <Group
            title="服务项目"
            onEditPress={this.handleEditPress(
              'CreateMyInstitutionServedProject',
            )}
          >
            {R.addIndex(R.map)((m, index) => (
              <FavorItem
                style={{ paddingHorizontal: 0 }}
                institutionId={this.props.id}
                key={m.id}
                data={m}
                showTopBorder={index !== 0}
              />
            ))(coins)}
          </Group>
        </ScrollView>
      </View>
    );
  }
}
