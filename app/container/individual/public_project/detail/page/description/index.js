import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { Flex, Modal } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import Financing from '../financing';
import MemberItem from 'component/project/description/member';
import InstitutionItem from './institutionItem';
import SocialNetworkItem from './socialNetworkItem';
import Roadmap from './roadmap';
import styles from './style';

@connect()
export default class Description extends PureComponent {
  showRatingTip = content => {
    Modal.alert('评级说明', content);
  };
  handleDocPress = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WhitePaper',
        params: {
          pdf_url: item.path_url,
          title: item.filename,
          id: R.path(['portfolio', 'id'])(this.props),
        },
      }),
    );
  };

  handleUrlPress = uri => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WebPage',
        params: {
          title: R.pathOr('', ['portfolio', 'name'])(this.props),
          uri,
        },
      }),
    );
  };

  render() {
    const description = R.pathOr('', ['portfolio', 'description'])(this.props);
    const siteUrl = R.pathOr('', ['portfolio', 'homepage'])(this.props);
    const white_papers = R.pathOr([], ['portfolio', 'white_papers'])(
      this.props,
    );
    const rating = R.pathOr([], ['portfolio', 'rating'])(this.props);
    const social_network = R.pathOr([], ['portfolio', 'social_networks'])(
      this.props,
    );
    const members = R.pathOr([], ['portfolio', 'members'])(this.props);
    const roadmap = R.pathOr([], ['portfolio', 'basic', 'roadmap'])(this.props);
    const invest_score = R.pathOr('', [0, 'invest_score'])(rating);
    const risk_score = R.pathOr('', [0, 'risk_score'])(rating);
    const grading_result = R.pathOr('', [0, 'grading_result'])(rating);
    const industry_investments = R.pathOr('', [
      'portfolio',
      'industry_investments',
    ])(this.props);
    const country_origin = R.pathOr('', ['portfolio', 'basic', 'country_origin'])(this.props);

    return (
      <View style={styles.container}>
        {R.not(R.isEmpty(description)) && (
          <View>
            <Text style={styles.title}>项目简介</Text>
            <Text style={styles.desc}>{description}</Text>
          </View>
        )}
        {R.not(R.isEmpty(white_papers)) && (
          <View>
            <Text style={[styles.title, styles.site]}>白皮书</Text>
            <View>
              {R.map(w => (
                <Text
                  key={w.id}
                  style={styles.link}
                  onPress={() => this.handleDocPress(w)}
                >
                  查看 {w.filename}
                </Text>
              ))(white_papers)}
            </View>
          </View>
        )}
        {R.not(R.isEmpty(siteUrl)) && (
          <View>
            <Text style={[styles.title, styles.site]}>官网</Text>
            <Text
              style={styles.link}
              onPress={() => this.handleUrlPress(siteUrl)}
            >
              {siteUrl}
            </Text>
          </View>
        )}
        {R.not(R.isEmpty(country_origin)) && (
          <View>
            <Text style={[styles.title, styles.site]}>国别</Text>
            <Text
              style={styles.desc}
            >
              {country_origin}
            </Text>
          </View>
        )}
        {R.not(R.isEmpty(invest_score) && R.isEmpty(risk_score)) && (
          <View>
            <Flex style={[styles.title, styles.site]} align="center">
              <Text
                style={{
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.85)',
                  fontWeight: 'bold',
                }}
              >
                评级信息
              </Text>
              {!R.isEmpty(grading_result) && (
                <TouchableWithoutFeedback
                  onPress={() => this.showRatingTip(grading_result)}
                >
                  <Image
                    style={styles.tip}
                    source={require('asset/public_project/tip_icon.png')}
                  />
                </TouchableWithoutFeedback>
              )}
            </Flex>
            <Flex style={styles.ratingItem}>
              {R.not(R.isEmpty(invest_score)) && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.ratingTitleText}>
                    投资评分
                    {'   '}
                    <Text style={styles.ratingItemText}>{invest_score}</Text>
                  </Text>
                </View>
              )}
              {R.not(R.isEmpty(risk_score)) && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.ratingTitleText}>
                    风险评估
                    {'   '}
                    <Text style={styles.ratingItemText}>{risk_score}</Text>
                  </Text>
                </View>
              )}
            </Flex>
          </View>
        )}
        {R.not(R.isEmpty(social_network)) && (
          <View>
            <Text style={[styles.title, styles.site]}>媒体信息</Text>
            <Flex wrap="wrap">
              {R.addIndex(R.map)((m, i) => (
                <SocialNetworkItem
                  style={{ paddingHorizontal: 0 }}
                  key={`${i}`}
                  name={m.name}
                  data={m.link_url}
                  onPress={() => {
                    this.props.dispatch(
                      NavigationActions.navigate({
                        routeName: 'WebPage',
                        params: {
                          title: m.name,
                          uri: m.link_url,
                        },
                      }),
                    );
                  }}
                />
              ))(social_network)}
            </Flex>
          </View>
        )}
        <Financing {...this.props} />
        {R.not(R.isEmpty(members)) && (
          <View>
            <Text style={[styles.title, styles.site]}>团队成员</Text>
            <View>
              {R.map(m => <MemberItem key={m.id} data={m} />)(members)}
            </View>
          </View>
        )}
        {R.not(R.isEmpty(industry_investments)) && (
          <View>
            <Text style={[styles.title, styles.site]}>投资机构</Text>
            <Flex wrap="wrap">
              {R.map(m => (
                <InstitutionItem
                  style={{ paddingHorizontal: 0 }}
                  key={m.id}
                  data={m}
                  onPress={() => this.props.onInstitutionItemPress(m)}
                />
              ))(industry_investments)}
            </Flex>
          </View>
        )}
        {R.not(R.isEmpty(roadmap)) && (
          <View>
            <Text style={[styles.title, styles.site]}>路线图</Text>
            <Roadmap {...this.props} roadmap={roadmap} />
          </View>
        )}
      </View>
    );
  }
}
