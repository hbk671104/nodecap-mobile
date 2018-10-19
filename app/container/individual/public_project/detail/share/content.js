import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
} from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import moment from 'moment';
import Accounting from 'accounting';

import MemberItem from 'component/project/description/member';
import InstitutionItem from '../page/description/institutionItem';
import SocialNetworkItem from '../page/description/socialNetworkItem';
import Roadmap from '../page/description/roadmap';
import Rating from './rating';
import styles from './styles';

const window = Dimensions.get('window');
export const DEVICE_WIDTH = window.width;

class ShareCoinContent extends Component {
  renderContent() {
    const { coin } = this.props;
    const siteUrl = R.pathOr('', ['homepage'])(coin);
    const invest_score = R.pathOr('', ['rating', 0, 'invest_score'])(coin);
    const risk_score = R.pathOr('', ['rating', 0, 'risk_score'])(coin);

    const info = R.pathOr({}, ['finance_info'])(coin);
    const start_at = R.pathOr(null, ['start_at'])(info);
    const end_at = R.pathOr(null, ['end_at'])(info);
    const token_supply = R.pathOr(null, ['token_supply'])(info);
    const conversion_ratio = R.pathOr(null, ['conversion_ratio'])(info);
    const industry_investments = R.pathOr([], ['industry_investments'])(coin);
    const social_network = R.pathOr([], ['coin', 'social_networks'])(
      this.props,
    );
    const members = R.pathOr([], ['coin', 'members'])(this.props);
    const roadmap = R.pathOr([], ['coin', 'basic', 'roadmap'])(this.props);
    const renderTitle = title => (
      <Flex>
        <View style={styles.dot} />
        <Text style={styles.contentTitle}>{title}</Text>
      </Flex>
    );
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.group}>
          {renderTitle('简介')}
          <Text numberOfLines={12} style={[styles.groupContent, styles.groupContentText]}>
            {coin.description}
          </Text>
        </View>
        <View style={styles.group}>
          {renderTitle('白皮书')}
          <Text style={[styles.groupContent, styles.groupContentText]}>
            长按底部二维码，查看项目白皮书
          </Text>
        </View>
        <View style={styles.group}>
          {renderTitle('评级信息')}
          {(risk_score || invest_score) && (
            <Rating {...this.props} />
          )}
          <Text style={[styles.groupContentTip]}>
            - 长按底部二维码，查看更多评级信息
          </Text>
        </View>
        <View style={styles.group}>
          {renderTitle('募集信息')}
          {!!start_at && (
            <Flex style={styles.groupContent} align="center">
              <Text style={styles.groupContentText}>开始时间</Text>
              <Text
                style={[
                  styles.groupContentText,
                  { marginLeft: 10, color: 'rgba(0,0,0,.85)' },
                ]}
              >
                {start_at ? moment.unix(start_at).format('YYYY.MM.DD') : '无'}
              </Text>
            </Flex>
          )}
          {!!end_at && (
            <Flex style={styles.groupContent} align="center">
              <Text style={styles.groupContentText}>结束时间</Text>
              <Text
                style={[
                  styles.groupContentText,
                  { marginLeft: 10, color: 'rgba(0,0,0,.85)' },
                ]}
              >
                {end_at ? moment.unix(end_at).format('YYYY.MM.DD') : '无'}
              </Text>
            </Flex>
          )}
          {!!token_supply && (
            <Flex style={styles.groupContent} align="center">
              <Text style={styles.groupContentText}>发售总量</Text>
              <Text
                style={[
                  styles.groupContentText,
                  { marginLeft: 10, color: 'rgba(0,0,0,.85)' },
                ]}
              >
                {Accounting.formatNumber(token_supply)}
              </Text>
            </Flex>
          )}
          {!!conversion_ratio && (
            <Flex style={styles.groupContent} align="center">
              <Text style={styles.groupContentText}>兑换比例</Text>
              <Text
                style={[
                  styles.groupContentText,
                  { marginLeft: 10, color: 'rgba(0,0,0,.85)' },
                ]}
              >
                {conversion_ratio}
              </Text>
            </Flex>
          )}
          <Text style={[styles.groupContentTip]}>
            - 长按底部二维码，查看更多募资信息
          </Text>
        </View>
        <View style={styles.group}>
          {renderTitle('团队成员')}
          <View>
            {R.map(m => <MemberItem key={m.id} data={m} style={{ marginLeft: 10 }} />)(members)}
          </View>
          <Text style={[styles.groupContentTip]}>
            - 长按底部二维码，联系团队成员
          </Text>
        </View>
        <View style={styles.group}>
          {renderTitle('媒体信息')}
          <Flex wrap="wrap">
            {R.addIndex(R.map)((m, i) => (
              <SocialNetworkItem
                style={{ paddingHorizontal: 0, marginTop: 10 }}
                key={`${i}`}
                name={m.name}
                data={m.link_url}
              />
            ))(social_network)}
          </Flex>
          <Text style={[styles.groupContentTip]}>
            - 长按底部二维码，查看媒体信息
          </Text>
        </View>
        <View style={[styles.group]}>
          {renderTitle('投资机构')}
          <Flex wrap="wrap">
            {R.map(m => (
              <InstitutionItem
                style={{ paddingHorizontal: 0, marginTop: 10 }}
                key={m.id}
                data={m}
              />
            ))(industry_investments)}
          </Flex>
          <Text style={[styles.groupContentTip]}>
            - 长按底部二维码，查看投资机构
          </Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          {renderTitle('路线图')}
          <Roadmap {...this.props} roadmap={roadmap} />
          <Text style={[styles.groupContentTip]}>
            - 长按底部二维码，查看路线图
          </Text>
        </View>
      </View>
    );
  }
  renderAd() {
    return (
      <Flex style={styles.ad.container} justify="between">
        <View>
          <Image
            style={styles.ad.logo}
            source={require('asset/logo_horizontal.png')}
          />
          <Text style={styles.ad.text}>找项目，上 Hotnode</Text>
        </View>
        <View>
          <Image
            style={styles.ad.qr}
            source={require('asset/coin_share/qr_code.png')}
          />
        </View>
      </Flex>
    );
  }
  render() {
    return (
      <View>
        {this.renderContent()}
        {this.renderAd()}
      </View>
    );
  }
}


export default ShareCoinContent;
