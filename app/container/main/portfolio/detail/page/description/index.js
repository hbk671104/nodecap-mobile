import React, { PureComponent } from 'react';
import { View, Text, Linking } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import { withState } from 'recompose';

import styles from './style';

@withState('textReady', 'setTextReady', false)
export default class Description extends PureComponent {
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
    const description = R.path(['portfolio', 'description'])(this.props);
    const siteUrl =
      R.path(['portfolio', 'site_url'])(this.props) ||
      R.path(['portfolio', 'coin', 'homepage'])(this.props);
    const rating = R.pathOr([], ['portfolio', 'coin_rating'])(this.props);
    return (
      <View style={styles.container}>
        {!!description && (
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
        {!!siteUrl && (
          <View>
            <Text style={[styles.title, styles.site]}>官网</Text>
            <Text style={styles.link} onPress={() => Linking.openURL(siteUrl)}>{siteUrl}</Text>
          </View>
        )}
        {!!rating.length && (
          <View>
            <Text style={[styles.title, styles.site]}>评级信息</Text>
            <Flex style={styles.ratingTitle} justify="space-between">
              <Text style={styles.ratingTitleText}>机构</Text>
              <Text style={[styles.ratingTitleText, { width: 80 }]}>评级</Text>
            </Flex>
            <View>
              {rating.map(i => (
                <Flex key={i.id} style={styles.ratingItem} justify="space-between">
                  <Text style={styles.ratingTitleText}>{i.rating_name}</Text>
                  <Text style={[styles.ratingItemText, { width: 80 }]}>{i.grade}</Text>
                </Flex>
              ))}
            </View>
          </View>
        )}

      </View>
    );
  }
}
