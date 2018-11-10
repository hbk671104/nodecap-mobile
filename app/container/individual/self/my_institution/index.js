import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import InstitutionSimplifiedItem from 'component/institution/simplified_item';
import List from 'component/uikit/list';
import styles from './style';

@global.bindTrack({
  page: '我的机构',
  name: 'App_MyInstitutionOperation',
})
@connect(({ institution_create, loading }) => ({
  current: R.pathOr({}, ['current'])(institution_create),
  data: R.pathOr([], ['list', 'data'])(institution_create),
  pagination: R.pathOr(null, ['list', 'pagination'])(institution_create),
  loading: loading.effects['institution_create/fetch'],
}))
class MyInstitution extends Component {
  componentWillMount() {
    const { current } = this.props;
    if (R.has('id')(current)) {
      this.props.dispatch({
        type: 'institution_create/resetCurrent',
      });
    }
  }

  componentDidMount() {
    this.props.track('进入');
  }

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution_create/fetch',
      payload: {
        page,
        'per-page': size,
      },
    });
  };

  handleCreatePress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyInstitutionBasicInfo',
      }),
    );
  };

  handleItemPress = item => () => {
    if (R.path(['owner_status'])(item) !== 1) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'CreateMyInstitutionDone',
        }),
      );
      return;
    }

    Toast.loading('加载中...', 0);
    this.props.dispatch({
      type: 'institution_create/get',
      id: R.path(['id'])(item),
      callback: () => {
        Toast.hide();
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'CreateMyInstitutionDetail',
          }),
        );
      },
    });
  };

  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="机构入驻通道"
      renderRight={() => (
        <Touchable borderless onPress={this.handleCreatePress}>
          <Text style={styles.navBar.right}>创建机构</Text>
        </Touchable>
      )}
    />
  );

  renderItem = ({ item }) => (
    <InstitutionSimplifiedItem
      data={item}
      onPress={this.handleItemPress(item)}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          loading={loading}
          action={this.requestData}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default MyInstitution;
