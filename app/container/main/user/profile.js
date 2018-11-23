import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';
import Empty from 'component/empty';
import shareModal from 'component/shareModal';
import Touchable from 'component/uikit/touchable';
import Config from 'runtime/index';

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
@shareModal
export default class InstitutionDetail extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleSharePress = () => {
    const { data, navigation } = this.props;
    const memberType = R.has('introduction')(data) ? 'coin-member' : 'investment-member';
    this.props.openShareModal({
      types: [{
        type: 'timeline',
        webpageUrl: `${Config.MOBILE_SITE}/${memberType}?id=${data.id}`,
        title: `推荐给你「${R.path(['name'])(data)}」`,
        description: '来 Hotnode 找全球区块链从业者！',
        thumbImage:
        R.path(['profile_pic'])(data) || R.path(['avatar_url'])(data) ||
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
      }, {
        type: 'session',
        webpageUrl: `${Config.MOBILE_SITE}/${memberType}?id=${data.id}`,
        title: `推荐给你「${R.path(['name'])(data)}」`,
        description: '来 Hotnode 找全球区块链从业者！',
        thumbImage:
        R.path(['profile_pic'])(data) || R.path(['avatar_url'])(data) ||
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
      }, {
        type: 'link',
        url: `${Config.MOBILE_SITE}/${memberType}?id=${data.id}`,
      }],
    });
  }

  renderNavBar = () => (
    <NavBar
      back
      gradient
      renderBottom={() => (
        <Header {...this.props} onLinkPress={this.handleLinkPress} />
      )}
      renderRight={() => (
        <Touchable onPress={this.handleSharePress}>
          <Text style={styles.right.text}>分享</Text>
        </Touchable>
      )}
    />
  );

  render() {
    const { data, in_individual } = this.props;
    const desc = R.pathOr('', ['description'])(data) || R.pathOr('', ['introduction'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {desc ? (
            <Group title="个人简介">
              <View style={styles.desc.container}>
                <Text style={styles.desc.text}>{desc}</Text>
              </View>
            </Group>
          ) : (
            <Empty image={require('asset/none.png')} title="暂无更多详细资料" />
          )}
        </ScrollView>
      </View>
    );
  }
}
