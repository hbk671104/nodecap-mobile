import React, { Component } from 'react';
import { View, ImageBackground, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Avatar from '../../../../../component/uikit/avatar';
import R from 'ramda';
import { Flex } from 'antd-mobile';

const window = Dimensions.get('window');
class InstitutionShareTop extends Component {
  render() {
    const { data } = this.props;
    const name = R.pathOr('--', ['name'])(data);
    const site_url = R.pathOr('', ['site_url'])(data);
    const logo = R.pathOr('', ['logo_url'])(data);
    const is_vip = R.path(['is_vip'])(data);
    const is_owned = R.path(['is_owned'])(data);
    const is_reachable = R.path(['is_reachable'])(data);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('asset/institution/share/share_background.png')}
          style={styles.background}
        >
          <View style={styles.top}>
            <Avatar
              size={101}
              source={{ uri: logo }}
              resizeMode="contain"
              raised={false}
              innerRatio={0.9}
              style={styles.avatar.container}
              imageStyle={styles.avatar.image}
            />
            <Text style={styles.title}>{name}</Text>
            <Flex style={{ marginTop: 8 }}>
              {!!is_vip && (
                <Image
                  source={require('asset/institution/institution_vip_detail.png')}
                />
              )}
              {!!is_owned && (
                <Image
                  style={{ marginLeft: 5 }}
                  source={require('asset/institution/is_owned_detail.png')}
                />
              )}
              {!!is_reachable && (
                <Image
                  style={{ marginLeft: 4 }}
                  source={require('asset/institution/reachable.png')}
                />
              )}
            </Flex>
            <Text style={styles.url} numberOfLines={1}>{site_url}</Text>
          </View>
          <View style={styles.bottom}>
            <Flex align="center" justify="between">
              <View>
                <Text style={styles.type}>#找{this.props.industryType}</Text>
                <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.85)' }}>上 Hotnode</Text>
              </View>
              <Image source={require('asset/coin_share/qr_code.png')} />
            </Flex>
            <Flex style={{ marginTop: 24 }} justify="center">
              <Image source={require('asset/institution/share/share_from_hotnode.png')} />
            </Flex>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
  },
  background: {
    width: 335,
    height: 548,
  },
  top: {
    height: 391,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    container: {
      borderRadius: 0,
      borderColor: '#e9e9e9',
      borderWidth: StyleSheet.hairlineWidth,
    },
    image: {
      borderRadius: 1,
    },
  },
  title: { marginHorizontal: 12, marginTop: 32, fontFamily: 'PingFangSC-Medium', fontSize: 30, color: 'rgba(0,0,0,0.85)', textAlign: 'center' },
  url: { marginHorizontal: 12, marginTop: 12, fontSize: 16, color: 'rgba(0,0,0,0.45)', textAlign: 'center' },
  type: {
    fontSize: 22,
    color: '#1890FF',
    fontFamily: 'PingFangSC-Medium',
  },
  bottom: {
    paddingHorizontal: 45,
    paddingVertical: 26,
    paddingBottom: 20,
  },
};

InstitutionShareTop.propTypes = {};
InstitutionShareTop.defaultProps = {};

export default InstitutionShareTop;
