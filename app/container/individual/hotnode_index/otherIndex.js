import React, { Component } from 'react';
import { View, ImageBackground, Text, Image, Animated } from 'react-native';
import { Flex } from 'antd-mobile';
import Placeholder from 'rn-placeholder';
import R from 'ramda';

class OtherIndex extends Component {
  state = {
    fadeAnim: new Animated.Value(1),
  }

  componentDidMount() {
    this.startIndexAnimation();
  }


  startIndexAnimation = () => {
    Animated.sequence(
    [Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0.3,
        duration: 400,
        delay: 200,
      }
    ), Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 800,
      }
    )]).start();
  }

  renderPlaceholder = (content) => {
    return <Animated.View style={{ opacity: this.state.fadeAnim }}>{content}</Animated.View>;
  }

  render() {
    const gbi = R.pathOr({}, ['global', 'other_index', 'gbi'])(this.props);
    const sic = R.pathOr({}, ['global', 'other_index', 'sic'])(this.props);
    const hsi = R.pathOr({}, ['global', 'other_index', 'hsi'])(this.props);
    const ixic = R.pathOr({}, ['global', 'other_index', 'ixic'])(this.props);
    return (
      <View style={{
        marginVertical: 20,
        marginHorizontal: 12,
      }}
      >
        <Flex justify="between" style={{ marginBottom: 10 }}>
          <ImageBackground
            source={require('asset/hotnode_index/gbi_background.jpg')}
            style={{
              width: 170,
              height: 87,
            }}
          >
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>
                  {gbi.name}
                </Text>
                <Text style={styles.index}>
                  {gbi.current_index}
                </Text>
                <Flex style={{ marginTop: 5 }}>
                  <Text style={styles.variation}>{gbi.index_variation > 0 ? `+${gbi.index_variation}` : gbi.index_variation}</Text>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Image
                      style={[styles.arrow, gbi.index_variance_ratio < 0 ? {
                        transform: [{ rotateZ: '180deg' }],
                      } : {}]}
                      source={require('asset/hotnode_index/index_arrow.png')}
                    />
                    <Text style={styles.variation}>{Math.abs(gbi.index_variance_ratio)}%</Text>
                  </Flex>
                </Flex>
              </View>
            )}
          </ImageBackground>
          <ImageBackground
            source={require('asset/hotnode_index/szzs_background.jpg')}
            style={{
              width: 170,
              height: 87,
            }}
          >
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>
                  {sic.name}
                </Text>
                <Text style={styles.index}>
                  {sic.current_index}
                </Text>
                <Flex style={{ marginTop: 5 }}>
                  <Text style={styles.variation}>{sic.index_variation > 0 ? `+${sic.index_variation}` : sic.index_variation}</Text>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Image
                      style={[styles.arrow, sic.index_variance_ratio < 0 ? {
                        transform: [{ rotateZ: '180deg' }],
                      } : {}]}
                      source={require('asset/hotnode_index/index_arrow.png')}
                    />
                    <Text style={styles.variation}>{Math.abs(sic.index_variance_ratio)}%</Text>
                  </Flex>
                </Flex>
              </View>
            )}
          </ImageBackground>
        </Flex>
        <Flex justify="between">
          <ImageBackground
            source={require('asset/hotnode_index/hs_background.jpg')}
            style={{
              width: 170,
              height: 87,
            }}
          >
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>
                  {hsi.name}
                </Text>
                <Text style={styles.index}>
                  {hsi.current_index}
                </Text>
                <Flex style={{ marginTop: 5 }}>
                  <Text style={styles.variation}>{hsi.index_variation > 0 ? `+${hsi.index_variation}` : hsi.index_variation}</Text>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Image
                      style={[styles.arrow, hsi.index_variance_ratio < 0 ? {
                        transform: [{ rotateZ: '180deg' }],
                      } : {}]}
                      source={require('asset/hotnode_index/index_arrow.png')}
                    />
                    <Text style={styles.variation}>{Math.abs(hsi.index_variance_ratio)}%</Text>
                  </Flex>
                </Flex>
              </View>
            )}
          </ImageBackground>
          <ImageBackground
            source={require('asset/hotnode_index/nsdq_background.jpg')}
            style={{
              width: 170,
              height: 87,
            }}
          >
            {this.renderPlaceholder(
              <View style={styles.item}>
                <Text style={styles.name}>
                  {ixic.name}
                </Text>
                <Text style={styles.index}>
                  {ixic.current_index}
                </Text>
                <Flex style={{ marginTop: 5 }}>
                  <Text style={styles.variation}>{ixic.index_variation > 0 ? `+${ixic.index_variation}` : ixic.index_variation}</Text>
                  <Flex style={{ marginLeft: 8 }} align="start">
                    <Image
                      style={[styles.arrow, ixic.index_variance_ratio < 0 ? {
                        transform: [{ rotateZ: '180deg' }],
                      } : {}]}
                      source={require('asset/hotnode_index/index_arrow.png')}
                    />
                    <Text style={styles.variation}>{Math.abs(ixic.index_variance_ratio)}%</Text>
                  </Flex>
                </Flex>
              </View>
            )}
          </ImageBackground>
        </Flex>
      </View>
    );
  }
}

const styles = {
  item: {
    margin: 10,
  },
  name: { fontFamily: 'PingFangSC-Medium', fontSize: 14, color: '#6C7EA4' },
  index: { fontFamily: 'DIN Alternate', fontSize: 17, color: '#8495B8', letterSpacing: 0.2, marginTop: 5 },
  variation: { fontSize: 12, color: '#6C7EA4', letterSpacing: 0.14 },
  arrow: {
    width: 5,
    height: 3,
    marginRight: 4,
    marginTop: 5,
  },
};
OtherIndex.propTypes = {};
OtherIndex.defaultProps = {};

export default OtherIndex;
