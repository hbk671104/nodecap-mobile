import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import ViewMoreText from 'react-native-view-more-text';
import StatusBadge from 'component/project/statusBadge';
import Avatar from 'component/uikit/avatar';
import styles from './style';

class header extends Component {
  linkTo = url => Linking.openURL(url)
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={styles.header.moreText}>[更多]</Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress} style={styles.header.moreText}>[收起]</Text>
    );
  }

  renderLinks({ white_papers, site_url }) {
    const showLine = white_papers && site_url;
    return (
      <View style={styles.header.links}>
        <Flex justify="space-between" align="center">
          {!!site_url &&
          <Text style={styles.header.link} onPress={() => this.linkTo(site_url)}>官网</Text>
          }
          {!!showLine && <View style={styles.header.division} />}
          {!!white_papers &&
          <Text style={styles.header.link} onPress={() => this.linkTo(white_papers)}>白皮书</Text>
          }
        </Flex>
      </View>

    );
  }

  render() {
    const projectProps = path => R.path(['item', ...path])(this.props);
    return (
      <View style={styles.header.container}>
        <Flex justify="space-between">
          <View>
            <Text style={styles.name}>{projectProps(['name'])}</Text>
            <StatusBadge status={4} />
            {!!projectProps(['token_name']) &&
            <Text style={styles.header.tokenName}>Token: {projectProps(['token_name'])}</Text>}
          </View>
          <View>
            <Avatar size={65} source={{ uri: projectProps(['logo_url']) }} />
          </View>
        </Flex>
        <View style={styles.header.descContainer}>
          <ViewMoreText
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            numberOfLines={2}
            textStyle={styles.header.desc}
          >
            <Text>
              {projectProps(['description'])}
            </Text>
          </ViewMoreText>
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
