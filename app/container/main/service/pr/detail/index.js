import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import CoinItem from './partials/coin';
import Group from './partials/group';
import Member from './partials/member';
import Header from './header';
import styles from './style';

const mock = {
  1: {
    id: 1,
    logo_url: require('asset/services/nodecap.png'),
    name: '贝壳公关',
    description: '一家专注于区块链行业的企业宣发公司',
    members: [{
      name: '晓雨',
      title: '创始人',
      description: '创始人',
    }],
    coins: [{
      name: 'Zilliqa',
      description: '基于真实数据的区块链开源协议',
    }],
  },
  2: {
    id: 2,
    logo_url: require('asset/services/nodeplus.png'),
    name: 'NodePlus',
    description: '专业的区块链行业项目路演，品牌宣传，企业宣传',
    members: [{
      name: '晓雨',
      title: '创始人',
      description: '创始人',
    }],
    coins: [{
      name: 'Zilliqa',
      description: '基于真实数据的区块链开源协议',
    }],
  },
};
@global.bindTrack({
  page: '公关服务详情',
  name: 'App_ServiceDetailOperation',
})
@connect(({ institution, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    data: R.pathOr({}, [id])(mock),
    loading: loading.effects['institution/get'],
  };
})
export default class PRServiceDetail extends Component {
  // componentWillMount() {
  //   this.loadDetail();
  // }

  componentDidMount() {
    this.props.track('进入');
  }
  //
  // componentWillUnmount() {
  //   this.props.dispatch({
  //     type: 'institution/clearCurrent',
  //     id: this.props.id,
  //   });
  // }

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
          {R.not(R.isEmpty(desc)) && (
            <Group title="公司简介">
              <View style={styles.desc.container}>
                <Text style={styles.desc.text}>{desc}</Text>
              </View>
            </Group>
          )}
          {R.not(R.isEmpty(members)) && (
            <Group title="团队成员">
              {R.map(m => <Member key={m.id} data={m} />)(members)}
            </Group>
          )}
          {R.not(R.isEmpty(coins)) && (
            <Group title="服务项目">
              {R.addIndex(R.map)((m, index) => (
                <CoinItem
                  data={m}
                  showTopBorder={index !== 0}
                />
              ))(coins)}
            </Group>
          )}
        </ScrollView>
      </View>
    );
  }
}
