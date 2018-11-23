import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Flex, Grid } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import MemberItem from 'component/project/description/member';
import InstitutionItem from './institutionItem';
import Touchable from 'component/uikit/touchable';

import Financing from '../financing';
import SocialNetworkItem, { iconMap } from './socialNetworkItem';
import Roadmap from './roadmap';
import Rating from './rating';
import styles from './style';

@connect(({ global }) => ({
  regions: R.pathOr([], ['constants', 'regions'])(global),
}))
export default class Description extends PureComponent {
  handleDocPress = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WhitePaper',
        params: {
          pdf_url: item.path_url,
          title: R.path(['portfolio', 'name'])(this.props),
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

  editField = routeName => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    );
  };

  render() {
    const description = R.pathOr('', ['portfolio', 'description'])(this.props);
    const siteUrl = R.pathOr('', ['portfolio', 'homepage'])(this.props);
    const white_papers = R.pathOr([], ['portfolio', 'white_papers'])(
      this.props,
    );
    const social_network = R.compose(
      R.filter(i => !!iconMap[String(i.name).toLowerCase()]),
      R.pathOr([], ['portfolio', 'social_networks']),
    )(this.props);
    const members = R.pathOr([], ['portfolio', 'members'])(this.props);
    const roadmap = R.pathOr([], ['portfolio', 'basic', 'roadmap'])(this.props);
    const industry_investments = R.pathOr('', [
      'portfolio',
      'industry_investments',
    ])(this.props);
    const regions = R.find(
      region => region.id === R.path(['portfolio', 'regions'])(this.props),
    )(this.props.regions);
    const title = (name, route, hideEdit = false) => (
      <Flex justify="between" align="center" style={styles.titleWrap}>
        <Text style={styles.title}>{name}</Text>
        {!hideEdit && (
          <Touchable
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
            borderless
            onPress={this.editField(route)}
          >
            <Text style={styles.correction}>编辑</Text>
          </Touchable>
        )}
      </Flex>
    );

    return (
      <View style={styles.container}>
        <View style={styles.fieldGroup}>
          {title('项目简介', 'CreateMyProjectDescription')}
          <Text style={styles.desc}>{description}</Text>
        </View>
        {R.not(R.isEmpty(white_papers)) && (
          <View style={styles.fieldGroup}>
            {title('白皮书', 'CreateMyProjectBasicInfo', true)}
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
        <View style={styles.fieldGroup}>
          {title('官网', 'CreateMyProjectBasicInfo')}
          <Text
            style={styles.link}
            onPress={() => this.handleUrlPress(siteUrl)}
          >
            {siteUrl}
          </Text>
        </View>
        <View style={styles.fieldGroup}>
          {title('国别', 'CreateMyProjectBasicInfo')}
          <Text style={styles.desc}>{R.pathOr('', ['name'])(regions)}</Text>
        </View>
        <Rating {...this.props} />
        <View style={styles.fieldGroup}>
          {title('媒体信息', 'CreateMyProjectSocial')}
          <Grid
            data={social_network}
            columnNum={3}
            hasLine={false}
            itemStyle={{
              height: 74,
            }}
            renderItem={(m, i) => (
              <SocialNetworkItem
                key={`${i}`}
                name={m.name}
                fans_count={m.fans_count}
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
            )}
          />
        </View>
        <Financing
          {...this.props}
          onEditPress={this.editField('CreateMyProjectFunding')}
        />
        <View style={styles.fieldGroup} onLayout={this.props.onTeamLayout}>
          {title('团队成员', 'CreateMyProjectTeam')}
          <View>
            {R.addIndex(R.map)((m, i) => (
              <MemberItem key={m.id || `${i}`} data={m} />
            ))(members)}
          </View>
        </View>
        {/* <View style={styles.fieldGroup}>
          {title('投资机构', 'CreateMyProjectFunding')}
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
        </View> */}
        <View style={styles.fieldGroup}>
          {title('路线图', 'CreateMyProjectRoadMap')}
          <Roadmap {...this.props} roadmap={roadmap} />
        </View>
      </View>
    );
  }
}
