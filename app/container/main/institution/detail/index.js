import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import FavorItem from 'component/favored/item';
import Touchable from 'component/uikit/touchable';

import Group from './partials/group';
import Member from './partials/member';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '机构详情',
  name: 'App_InstitutionDetailOperation',
})
@connect(({ institution, login, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    data: R.pathOr({}, ['current', id])(institution),
    logged_in: !!login.token,
    in_individual: login.in_individual,
    loading: loading.effects['institution/get'],
  };
})
export default class InstitutionDetail extends Component {
  componentWillMount() {
    this.loadDetail();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'institution/clearCurrent',
      id: this.props.id,
    });
  }

  onPressClaimCoin = () => {
    this.props.track('点击认领按钮');
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ClaimMyInstitution',
        params: {
          id: this.props.id,
        },
      }),
    );
  };

  loadDetail = () => {
    this.props.dispatch({
      type: 'institution/get',
      payload: this.props.id,
    });
  };

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

  goToMemberDetail = (data) => {
    this.props.track('点击进入成员主页');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'UserProfile',
        params: {
          data,
        },
      }),
    );
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
    const members = R.pathOr([], ['members'])(data);
    const coins = R.pathOr([], ['coins'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {R.not(R.isEmpty(desc)) && (
            <Group title="机构简介">
              <View style={styles.desc.container}>
                <Text style={styles.desc.text}>{desc}</Text>
              </View>
            </Group>
          )}
          {R.not(R.isEmpty(members)) && (
            <Group title="机构成员">
              {R.map(m => (
                <Member
                  key={m.id}
                  data={m}
                  onPress={() => this.goToMemberDetail(m)}
                />
              ))(members)}
            </Group>
          )}
          {R.not(R.isEmpty(coins)) && (
            <Group title="已投项目">
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
          )}
        </ScrollView>
        {in_individual && (
          <Touchable
            style={styles.claim.container}
            onPress={this.onPressClaimCoin}
          >
            <Image source={require('asset/project/detail/claim.png')} />
          </Touchable>
        )}
      </View>
    );
  }
}
