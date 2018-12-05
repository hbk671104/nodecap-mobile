import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, ViewPropTypes, StyleSheet } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const item = ({
  style,
  wrapperStyle,
  data,
  onPress,
  disableSubtitle,
  renderBottom,
}) => {
  const title = R.pathOr('--', ['name'])(data);
  const des = R.pathOr('', ['description'])(data);
  const logo_url = R.pathOr('', ['logo_url'])(data);
  const is_vip = R.path(['is_vip'])(data);
  const is_owned = R.path(['is_owned'])(data);
  const is_reachable = R.path(['is_reachable'])(data);
  return (
    <Touchable foreground onPress={onPress}>
      <View style={wrapperStyle}>
        <View style={[styles.container, style]}>
          <View>
            <Avatar
              style={styles.avatar}
              size={52}
              innerRatio={0.95}
              raised={false}
              source={{ uri: logo_url }}
            />
            {!!is_vip && (
              <Image
                style={styles.content.vip}
                source={require('asset/institution/institution_vip.png')}
              />
            )}
          </View>
          <View style={styles.content.container}>
            <Flex>
              <Text style={styles.content.title}>{title}</Text>
              {!!is_owned && (
                <Image
                  style={{ marginLeft: 12 }}
                  source={require('asset/institution/is_owned.png')}
                />
              )}
            </Flex>
            {!!is_reachable && (
              <View style={styles.reachable.container}>
                <Text style={styles.reachable.text}>可联系</Text>
              </View>
            )}
            {!R.isEmpty(des) && !disableSubtitle && (
              <Text style={styles.content.subtitle} numberOfLines={1}>
                {des}
              </Text>
            )}
          </View>
        </View>
        {renderBottom && renderBottom()}
      </View>
    </Touchable>
  );
};

item.propTypes = {
  style: ViewPropTypes.style,
  disableSubtitle: PropTypes.bool,
};

item.defaultProps = {
  disableSubtitle: false,
};

const styles = {
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    borderColor: '#F0F0F0',
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  content: {
    container: {
      marginLeft: 20,
      flex: 1,
    },
    vip: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  reachable: {
    container: {
      height: 17,
      width: 37,
      borderRadius: 1,
      backgroundColor: '#E5F3FF',
      marginTop: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 10,
      color: '#1890FF',
    },
  },
};

export default item;
