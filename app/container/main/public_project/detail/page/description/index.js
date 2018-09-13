import React, { PureComponent } from 'react';
import { View, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import ReadMore from 'react-native-read-more-text';
import { Flex } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import MemberItem from './member';
import styles from './style';

@connect()
export default class Description extends PureComponent {
  handleDocPress = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReportDetail',
        params: {
          pdf_url: item.path_url,
          title: item.filename,
        },
      }),
    );
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.more} onPress={handlePress}>
        [更多]
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.more} onPress={handlePress}>
        [收起]
      </Text>
    );
  };

  render() {
    const description = R.pathOr('', ['portfolio', 'description'])(this.props);
    const siteUrl = R.pathOr('', ['portfolio', 'homepage'])(this.props);
    const white_papers = R.pathOr([], ['portfolio', 'white_papers'])(
      this.props,
    );
    const rating = R.pathOr([], ['portfolio', 'rating'])(this.props);
    const members = R.pathOr([], ['portfolio', 'members'])(this.props);

    return (
      <View style={styles.container}>
        {R.not(R.isEmpty(description)) && (
          <View>
            <Text style={styles.title}>项目简介</Text>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
            >
              <Text style={styles.desc}>{description}</Text>
            </ReadMore>
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
            <Text style={styles.link} onPress={() => Linking.openURL(siteUrl)}>
              {siteUrl}
            </Text>
          </View>
        )}
        {R.not(R.isEmpty(rating)) && (
          <View>
            <Text style={[styles.title, styles.site]}>评级信息</Text>
            <Flex style={styles.ratingTitle} justify="space-between">
              <Text style={styles.ratingTitleText}>机构</Text>
              <Text style={[styles.ratingTitleText, { width: 80 }]}>评级</Text>
            </Flex>
            <View>
              {rating.map(i => (
                <Flex
                  key={i.id}
                  style={styles.ratingItem}
                  justify="space-between"
                >
                  <Text style={styles.ratingTitleText}>{i.rating_name}</Text>
                  <Text style={[styles.ratingItemText, { width: 80 }]}>
                    {i.grade}
                  </Text>
                </Flex>
              ))}
            </View>
          </View>
        )}
        {R.not(R.isEmpty(members)) && (
          <View>
            <Text style={[styles.title, styles.site]}>团队成员</Text>
            <View>
              {R.map(m => <MemberItem key={m.id} data={m} />)(members)}
            </View>
          </View>
        )}
      </View>
    );
  }
}
