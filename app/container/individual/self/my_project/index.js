import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast } from 'antd-mobile';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import SimplifiedItem from 'component/public_project/simplified_item';
import List from 'component/uikit/list';
import Empty from 'component/empty';
import Reviewed from 'component/reviewed';
import shareModal from 'component/shareModal';
import Config from 'runtime/index';
import { Storage } from 'utils';
import Share from '../../public_project/detail/share';
import styles from './style';

@global.bindTrack({
  page: '我的项目',
  name: 'App_MyProjectOperation',
})
@connect(({ project_create, loading }) => ({
  data: R.pathOr([], ['list', 'data'])(project_create),
  pagination: R.pathOr(null, ['list', 'pagination'])(project_create),
  loading: loading.effects['project_create/fetch'],
}))
@compose(
  withState('reviewedVisible', 'setReviewedVisible', false),
  withState('reviewedItem', 'setReviewedItem', null),
)
@shareModal
class MyProject extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  async componentWillReceiveProps(nextProps) {
    const data = R.pathOr([], ['data'])(nextProps);
    if (R.length(data) > 0) {
      const reviewed_item = R.find(d => R.path(['owner_status'])(d) === '1')(
        data,
      );
      if (reviewed_item && !nextProps.reviewedItem) {
        this.props.setReviewedItem(reviewed_item);
        const showed_reviewed_project = await Storage.get(
          'showed_reviewed_project',
        );
        if (showed_reviewed_project) {
          return;
        }
        this.props.setReviewedVisible(true);
      }
    }
  }

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'project_create/fetch',
      payload: {
        page,
        'per-page': size,
      },
    });
  };

  handleCreatePress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyProject',
      }),
    );
  };

  handleItemPress = item => () => {
    if (R.path(['owner_status'])(item) !== '1') {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'CreateMyProjectDone',
        }),
      );
      return;
    }

    Toast.loading('加载中...', 0);
    this.props.dispatch({
      type: 'project_create/get',
      id: item.id,
      callback: () => {
        Toast.hide();
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'CreateMyProjectDetail',
          }),
        );
      },
    });
  };

  handleWeeklyReport = (e, id) => {
    e.preventDefault();
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'MyProjectReportList',
        params: {
          id,
        },
      }),
    );
  };

  handleExitPress = () => {
    this.props.setReviewedVisible(false);
    Storage.set('showed_reviewed_project', true);
  };

  handleSharePress = () => {
    const data = this.props.reviewedItem;
    this.props.setReviewedVisible(false);
    this.props.openShareModal({
      types: [{
        type: 'timeline',
        webpageUrl: `${Config.MOBILE_SITE}/coin?id=${data.id}`,
        title: `推荐给你「${R.path(['name'])(data)}」`,
        description: '来 Hotnode 找最新最热项目！',
        thumbImage:
        R.path(['icon'])(data) ||
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
      }, {
        type: 'session',
        webpageUrl: `${Config.MOBILE_SITE}/coin?id=${data.id}`,
        title: `推荐给你「${R.path(['name'])(data)}」`,
        description: '来 Hotnode 找最新最热项目！',
        thumbImage:
        R.path(['icon'])(data) ||
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
      }, {
        type: 'picture',
      }, {
        type: 'link',
        url: `${Config.MOBILE_SITE}/coin?id=${data.id}`,
      }],
    });
  };

  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="我的项目"
      renderRight={() => (
        <Touchable borderless onPress={this.handleCreatePress}>
          <Text style={styles.navBar.right}>创建项目</Text>
        </Touchable>
      )}
    />
  );

  renderItem = ({ item }) => (
    <SimplifiedItem
      data={item}
      onPress={this.handleItemPress(item)}
      onPressWeeklyReport={this.handleWeeklyReport}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderEmpty = () => (
    <Empty
      style={{ marginTop: 70, backgroundColor: 'transparent' }}
      image={require('asset/empty/empty_data.png')}
      title="暂无项目，快创建属于你自己的项目吧"
      buttonTitle="立即创建"
      buttonStyle={{ width: 210, marginHorizontal: 0, alignSelf: 'center' }}
      buttonTitleStyle={{ fontSize: 13 }}
      action={this.handleCreatePress}
    />
  );

  render() {
    const { data, pagination, loading, reviewedVisible } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          loading={loading}
          action={this.requestData}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderEmpty={this.renderEmpty}
          style={styles.container}
        />
        <Reviewed
          visible={reviewedVisible}
          onExitPress={this.handleExitPress}
          onSharePress={this.handleSharePress}
        />
        {!!this.props.reviewedItem && (
          <Share
            onClose={() => this.props.toggleSharePictureModal(false)}
            coin={this.props.reviewedItem}
            visible={this.props.showSharePictureModal}
          />
        )}
      </View>
    );
  }
}

export default MyProject;
