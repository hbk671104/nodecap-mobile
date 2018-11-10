import React, { Component } from 'react';
import { Dimensions, View, Image, Text } from 'react-native';
import { Flex, Grid } from 'antd-mobile';
import R from 'ramda';
import moment from 'moment';
import Accounting from 'accounting';

import MemberItem from './member';
import InstitutionItem from '../page/description/institutionItem';
import SocialNetworkItem, { iconMap } from './socialNetworkItem';
import Roadmap from '../page/description/roadmap';
import Rating from './rating';
import styles from './styles';
import { SolidAvatar } from 'component/uikit/avatar';

const window = Dimensions.get('window');
export const DEVICE_WIDTH = window.width;

const emptyMap = {
  papers: { name: '白皮书', icon: require('asset/coin_share/empty/papers.png') },
  rating: { name: '评级', icon: require('asset/coin_share/empty/rating.png') },
  financing: { name: '募资信息', icon: require('asset/coin_share/empty/financing.png') },
  members: { name: '团队成员', icon: require('asset/coin_share/empty/members.png') },
  social_network: { name: '媒体信息', icon: require('asset/coin_share/empty/social_network.png') },
  industry_investments: { name: '投资机构', icon: require('asset/coin_share/empty/industry_investments.png') },
  roadmap: { name: '路线图', icon: require('asset/coin_share/empty/roadmap.png') },
};

class ShareCoinContent extends Component {
  state = {
    emptyKeys: [],
  }

  renderRest() {
    const renderTitle = title => (
      <Flex>
        <View style={styles.dot} />
        <Text style={styles.contentTitle}>{title}</Text>
      </Flex>
    );
    return (
      <View style={styles.group}>
        {renderTitle('扫描二维码，查看更多信息')}
        <Flex
          wrap="wrap"
          style={{
          marginTop: 10,
        }}
        >
          {this.state.emptyKeys.map(i => (
            <View style={{
              justifyContent: 'center',
              marginRight: 18,
              marginBottom: 10,
            }}
            >
              <SolidAvatar size={40} innerRatio={2 / 5} source={emptyMap[i].icon} />
              <Text style={{
                marginTop: 5,
                fontSize: 10,
                color: 'rgba(0, 0, 0, 0.65)',
                textAlign: 'center',
              }}
              >{emptyMap[i].name}
              </Text>
            </View>
        ))}
        </Flex>
      </View>
    );
  }

  renderConditionView({ emptyKey, condition, content }) {
    if (!condition) {
      if (emptyKey && R.not(R.contains(emptyKey)(this.state.emptyKeys))) {
        this.setState({
          emptyKeys: [...this.state.emptyKeys, emptyKey],
        });
      }
      return null;
    }

    return content;
  }

  renderContent() {
    const { coin } = this.props;
    const name = R.pathOr('', ['name'])(coin);
    const siteUrl = R.pathOr('', ['homepage'])(coin);
    const invest_score = R.pathOr('', ['rating', 0, 'invest_score'])(coin);
    const risk_score = R.pathOr('', ['rating', 0, 'risk_score'])(coin);

    const papers = R.pathOr([], ['white_papers'])(coin);
    const info = R.pathOr({}, ['finance_info'])(coin);
    const start_at = R.pathOr(null, ['start_at'])(info);
    const end_at = R.pathOr(null, ['end_at'])(info);
    const token_supply = R.pathOr(null, ['token_supply'])(info);
    const conversion_ratio = R.pathOr(null, ['conversion_ratio'])(info);
    const industry_investments = R.pathOr([], ['industry_investments'])(coin);
    const social_network = R.compose(R.filter(i => !!iconMap[String(i.name).toLowerCase()]), R.pathOr([], ['coin', 'social_networks']))(
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
        {this.renderConditionView({
          condition: coin.description,
          content: (
            <View style={styles.group}>
              {renderTitle('简介')}
              <Text
                numberOfLines={12}
                style={[styles.groupContent, styles.groupContentText]}
              >
                {coin.description}
              </Text>
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: papers && papers.length,
          emptyKey: 'papers',
          content: (
            <View style={styles.group}>
              {renderTitle('白皮书')}
              <Flex align="center" style={{ marginTop: 10 }}>
                <Image source={require('asset/institution/pdf.png')} />
                <Text style={[styles.groupContentText, { marginLeft: 5 }]}>{name} 项目白皮书.pdf</Text>
              </Flex>
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: risk_score || invest_score,
          emptyKey: 'rating',
          content: (
            <View style={styles.group}>
              {renderTitle('评级信息')}
              <Rating {...this.props} />
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: start_at || end_at || token_supply || conversion_ratio,
          emptyKey: 'financing',
          content: (
            <View style={styles.group}>
              {renderTitle('募集信息')}
              {this.renderConditionView({
                condition: start_at,
                content: (
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
                ),
              })}
              {this.renderConditionView({
                condition: end_at,
                content: (
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
                ),
              })}
              {this.renderConditionView({
                condition: token_supply,
                content: (
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
                ),
              })}
              {this.renderConditionView({
                condition: conversion_ratio,
                content: (
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
                ),
              })}
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: members && members.length,
          emptyKey: 'members',
          content: (
            <View style={styles.group}>
              {renderTitle('团队成员')}
              <View>
                {R.map(m => (
                  <MemberItem key={m.id} data={m} style={{ marginLeft: 10 }} />
                ))(R.take(5)(members))}
              </View>
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: social_network && social_network.length,
          emptyKey: 'social_network',
          content: (
            <View style={styles.group}>
              {renderTitle('媒体信息')}
              <View style={{
                marginTop: 10,
                marginLeft: 10,
              }}
              >
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
              </View>
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: industry_investments && industry_investments.length,
          emptyKey: 'industry_investments',
          content: (
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
            </View>
          ),
        })}
        {this.renderConditionView({
          condition: roadmap && roadmap.length,
          emptyKey: 'roadmap',
          content: (
            <View style={{ marginBottom: 30 }}>
              {renderTitle('路线图')}
              <Roadmap {...this.props} roadmap={roadmap} />
            </View>
          ),
        })}
        {this.renderRest()}
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
