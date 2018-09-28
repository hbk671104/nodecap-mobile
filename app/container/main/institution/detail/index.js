import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';
import FavorItem from 'component/favored/item';

import Group from './partials/group';
import Member from './partials/member';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '机构详情',
  name: 'App_InstitutionDetailOperation',
})
@connect(({ institution, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    data: R.pathOr({}, ['current'])(institution),
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
    });
  }

  loadDetail = () => {
    this.props.dispatch({
      type: 'institution/get',
      payload: this.props.id,
    });
  };

  renderNavBar = () => (
    <NavBar back gradient renderBottom={() => <Header {...this.props} />} />
  );

  render() {
    const { data, loading } = this.props;
    const desc = R.pathOr('---', ['description'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          <Group title="机构简介">
            <View style={styles.desc.container}>
              <Text style={styles.desc.text}>{desc}</Text>
            </View>
          </Group>
          <Group title="机构成员">
            {R.pipe(
              R.pathOr([], ['members']),
              R.map(m => <Member key={m.id} data={m} />),
            )(data)}
          </Group>
          <Group title="已投项目">
            {R.pipe(
              R.pathOr([], ['coins']),
              R.addIndex(R.map)((m, index) => (
                <FavorItem key={m.id} data={m} showTopBorder={index !== 0} />
              )),
            )(data)}
          </Group>
        </ScrollView>
      </View>
    );
  }
}
