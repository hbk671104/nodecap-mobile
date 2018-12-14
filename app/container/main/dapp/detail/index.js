import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'react-native';
import { Flex } from 'antd-mobile';
import NavBar from '../../../../component/navBar';
import Header from './header';
import Touchable from '../../../../component/uikit/touchable';
import connect from 'react-redux/es/connect/connect';
import * as R from 'ramda';
import Group from '../../institution/detail/partials/group';
import GroupStyles from '../../institution/detail/style';
import TradingInfo from './trade';
import Chart from './chart';
import shareModal from '../../../../component/shareModal';
import runtimeConfig from '../../../../runtime';
import DappChartTable from './tabel';
import { NavigationActions } from 'react-navigation';

@global.bindTrack({
  page: 'DApp 详情',
  name: 'App_DAppDetailOperation',
})
@connect(({ dapp, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    data: R.pathOr({}, ['current', id])(dapp),
    loading: loading.effects['dapp/fetchDappDetail'],
  };
})
@shareModal
class DappDetail extends Component {
  componentWillMount() {
    this.props.track('进入');
    this.loadDetail();
  }

  loadDetail = () => {
    this.props.dispatch({
      type: 'dapp/fetchDappDetail',
      id: this.props.id,
    });
  };

  handleLinkPress = uri => {
    const name = R.pathOr('', ['data', 'title'])(this.props);

    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WebPage',
        params: {
          title: name,
          uri,
        },
      }),
    );
  }

  handleSharePress = () => {
    const { data, navigation } = this.props;
    this.props.openShareModal({
      types: [
        {
          type: 'timeline',
          webpageUrl: `${runtimeConfig.MOBILE_SITE}/dapp?id=${
            data.id
            }`,
          title: `来 Hotnode 联系「${R.path(['title'])(data)}」`,
          description: '来 Hotnode 联系全球优质 Dapp 项目',
          thumbImage: R.pathOr(
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
            ['logo'],
          )(data),
        },
        {
          type: 'session',
          webpageUrl: `${runtimeConfig.MOBILE_SITE}/dapp?id=${
            data.id
            }`,
          title: `推荐给你一个靠谱 Dapp 项目「${R.path([
            'title',
          ])(data)}」`,
          description: '来 Hotnode 找全球 Dapp！',
          thumbImage: R.pathOr(
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
            ['logo'],
          )(data),
        },
        {
          type: 'link',
          url: `${runtimeConfig.MOBILE_SITE}/dapp?id=${
            data.id
            }`,
        },
      ],
    });
  }

  render() {
    const desc = R.pathOr('', ['data', 'description'])(this.props);
    const base = R.pathOr({}, ['data', 'base_stats'])(this.props);
    const unit = R.pathOr('', ['data', 'topic', 'name'])(this.props).toUpperCase();

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          gradient
          renderBottom={() => (
            <Header {...this.props} onLinkPress={this.handleLinkPress} />
          )}
          renderRight={() => (
            <Touchable borderless onPress={this.handleSharePress}>
              <Image
                style={{ width: 18, height: 18 }}
                source={require('asset/icon_share.png')}
              />
            </Touchable>
          )}
        />
        <ScrollView>
          {R.not(R.isEmpty(desc)) && (
            <Group title="简介">
              <View style={GroupStyles.desc.container}>
                <Text style={GroupStyles.desc.text}>{desc}</Text>
              </View>
            </Group>
          )}
          {R.not(R.isEmpty(base)) && (
            <Group title="参与情况">
              <View style={styles.amount}>
                <Text style={styles.amountTitle}>余额</Text>
                <Text style={styles.amountCount}>{base.balance} {unit}</Text>
              </View>
              <TradingInfo {...this.props} />
            </Group>
          )}
          <Chart {...this.props} />
          <DappChartTable {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  amount: {
    marginVertical: 6,
  },
  amountTitle: { fontSize: 13, color: 'rgba(0,0,0,0.65)' },
  amountCount: { fontFamily: 'PingFangSC-Medium', fontSize: 19, color: 'rgba(0,0,0,0.85)' },
};

DappDetail.propTypes = {};
DappDetail.defaultProps = {};

export default DappDetail;
