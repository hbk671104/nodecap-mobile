import React, { PureComponent } from 'react';
import { View, Text, Linking } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import ReadMore from 'react-native-read-more-text';
import StatusBadge from 'component/project/statusBadge';
import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';
import Price from 'component/price';
import styles from './style';

class header extends PureComponent {
  linkTo = url => () => Linking.openURL(url);
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={styles.header.moreText}>
        [更多]
      </Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress} style={styles.header.moreText}>
        [收起]
      </Text>
    );
  }

  renderLinks({ white_papers, site_url }) {
    if (R.or(R.isNil(white_papers), R.isNil(site_url))) {
      return <View style={{ marginTop: 9 }} />;
    }
    const showLine = white_papers && site_url;
    return (
      <View style={styles.header.links}>
        {!!site_url && (
          <View style={styles.header.link.container}>
            <Touchable borderless onPress={this.linkTo(site_url)}>
              <Text style={styles.header.link.text}>官网</Text>
            </Touchable>
          </View>
        )}
        {!!showLine && <View style={styles.header.division} />}
        {!!white_papers && (
          <View style={styles.header.link.container}>
            <Touchable borderless onPress={this.linkTo(white_papers)}>
              <Text style={styles.header.link.text}>白皮书</Text>
            </Touchable>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { item } = this.props;
    const projectProps = path => R.path(['item', ...path])(this.props);
    if (R.isNil(item) || R.isEmpty(item)) {
      return null;
    }
    return (
      <View style={styles.header.root}>
        <View style={styles.header.container}>
          <Flex>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{projectProps(['name'])}</Text>
              <StatusBadge status={projectProps(['status'])} />
              <View style={{ marginTop: 3 }}>
                {!!projectProps(['token_name']) && (
                  <Text style={styles.header.tokenName}>
                    Token:{' '}
                    <Text style={styles.header.contentText}>
                      {projectProps(['token_name'])}
                    </Text>
                  </Text>
                )}
                <Text style={styles.header.tokenName}>
                  成本价:{' '}
                  {projectProps(['unit_cost']) ? (
                    <Text style={styles.header.contentText}>
                      <Price symbol="ETH">
                        {projectProps(['unit_cost', 'ETH'])}
                      </Price>{' '}
                      ETH ≈{' '}
                      <Price symbol="CNY">
                        {projectProps(['unit_cost', 'CNY'])}
                      </Price>{' '}
                      CNY
                    </Text>
                  ) : (
                    '前往网页版添加投资记录，查看成本价'
                  )}
                </Text>
              </View>
            </View>
          </Flex>
          <View style={styles.header.descContainer}>
            <ReadMore
              renderTruncatedFooter={this.renderViewMore}
              renderRevealedFooter={this.renderViewLess}
              numberOfLines={2}
            >
              <Text style={styles.header.desc}>
                {projectProps(['description'])}
              </Text>
            </ReadMore>
          </View>
          <Avatar
            style={styles.header.avatar}
            size={65}
            source={{ uri: projectProps(['logo_url']) }}
          />
        </View>
        {this.renderLinks({
          white_papers: projectProps(['white_papers', 0, 'attachment']),
          site_url: projectProps(['site_url']),
        })}
      </View>
    );
  }
}

header.propTypes = {};
header.defaultProps = {};

export default header;
