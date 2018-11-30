import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from '../style';
import List from 'component/uikit/list';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import R from 'ramda';
import { deleteWeeklyReport } from 'services/individual/api';

import NavBar from 'component/navBar';
import shareModal from 'component/shareModal';
import Touchable from 'component/uikit/touchable';
import Config from 'runtime/index';
import WeeklyReportItem from './item';

@global.bindTrack({
  page: '周报管理',
  name: 'App_WeeklyReportsOperation',
})
@connect(({ public_project, loading }, { navigation }) => ({
  data: R.pathOr([], ['current', navigation.getParam('id'), 'weekly'])(public_project),
  loading: loading.effects['public_project/get'],
}))
@shareModal
class ReportList extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'public_project/get',
      id: this.props.navigation.getParam('id'),
    });
  }

  handleCreatePress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateWeeklyReport',
        params: {
          id: this.props.navigation.getParam('id'),
        },
      }),
    );
  }

  handleEditPress = (data) => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'EditWeeklyReport',
        params: {
          id: data.id,
          data,
        },
      }),
    );
  }

  handleDeletePress = (id) => {
    Alert.alert('提示', '确认要删除该周报吗？', [
      {
        text: '确认',
        onPress: async () => {
          await deleteWeeklyReport(id);
          this.props.dispatch({
            type: 'public_project/get',
            id: this.props.navigation.getParam('id'),
          });
        },
      },
      { text: '取消', style: 'cancel' },
    ]);
  }

  handleShare = (item) => {
    const coin = this.props.navigation.getParam('data');
    const url = `${Config.MOBILE_SITE}/weekly-report?id=${item.id}`;
    const request = {
      webpageUrl: url,
      title: item.title,
      description: '来 Hotnode, 发现最新最热项目！',
      thumbImage: coin.icon,
    };

    this.props.openShareModal({
      types: [{
        type: 'timeline',
        ...request,
      }, {
        type: 'session',
        ...request,
      }, {
        type: 'link',
        url,
      }],
    });
  }

  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="周报管理"
      renderRight={() => (
        <Touchable borderless onPress={this.handleCreatePress}>
          <Text style={styles.navBar.right}>发布新周报</Text>
        </Touchable>
      )}
    />
  );

  renderItem = ({ item }) => (
    <WeeklyReportItem
      data={item}
      coin={this.props.navigation.getParam('data')}
      onDelete={this.handleDeletePress}
      onEdit={this.handleEditPress}
      onShare={() => this.handleShare(item)}
    />
  );

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          loading={loading}
          data={data}
          renderItem={this.renderItem}
          style={styles.container}
        />
      </View>
    );
  }
}

ReportList.propTypes = {};
ReportList.defaultProps = {};

export default ReportList;
