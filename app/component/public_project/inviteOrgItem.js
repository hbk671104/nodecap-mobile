import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar.solid';
import { raised as raisedStyle } from '../../utils/style';
import store from '../../../index';

class InviteOrgItem extends Component {
  toCoinDetail = (id) => {
    store.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id,
        },
        key: `PublicProjectDetail_${id}`,
      }),
    );
    this.props.onPress();
  }

  render() {
    const { data } = this.props;
    const category = R.pipe(
      R.pathOr([], ['tags']),
      R.take(4),
    )(data);
    return (
      <View style={styles.container}>
        <Flex style={styles.background} justify="center">
          <Avatar
            source={{ uri: data.logo_url }}
            style={[styles.logo, raisedStyle]}
            size={80}
          />
        </Flex>
        <View style={styles.content}>
          <Text style={styles.title}>{data.name}</Text>
          <Text numberOfLines={1} style={styles.desc}>{data.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  logo: {
    width: 65,
    height: 65,
    borderRadius: 2,
    marginTop: 60,
    borderColor: 'transparent',
  },
  background: {
    backgroundColor: '#1890FF',
    height: 75,
  },
  container: {
    width: 270,
    height: 180,
  },
  content: {
    marginTop: 35,
    alignItems: 'center',
  },
  title: { fontSize: 20, color: '#1890FF', letterSpacing: 0.41 },
  symbol: { fontSize: 12, color: 'rgba(0,0,0,0.45)', letterSpacing: 0.25 },
  tags: {
    marginTop: 20,
  },
  tag: {
    wrapper: {
      marginTop: 8,
      flexDirection: 'row',
    },
    container: {
      height: 17,
      paddingHorizontal: 3,
      borderRadius: 1,
      marginRight: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    title: {
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  desc: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.13,
    lineHeight: 18,
    marginHorizontal: 30,
    marginTop: 5,
  },
  button: {
    height: 45.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderTopColor: '#e9e9e9',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  buttonText: { fontSize: 15, color: '#1890FF', letterSpacing: 0.24, textAlign: 'center' },
};

InviteOrgItem.propTypes = {};
InviteOrgItem.defaultProps = {};

export default InviteOrgItem;
