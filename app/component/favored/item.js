import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Flex } from 'antd-mobile';

import PublicProjectItem from 'component/public_project/item';
import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

@connect(({ login }) => ({
  logged_in: !!login.token,
  in_individual: login.in_individual,
}))
class FavorItem extends PureComponent {
  static propType = {
    data: PropTypes.object.isRequired,
  };

  handlePress = () => {
    // this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id: R.path(['data', 'id'])(this.props),
        },
        key: `PublicProjectDetail_${this.props.data.id}`,
      }),
    );
  };

  handleFavorPress = () => {
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    const is_focused = R.pathOr(true, ['is_focused'])(this.props.data);
    const id = R.pathOr(0, ['id'])(this.props.data);
    this.props.dispatch({
      type: is_focused ? 'public_project/unfavor' : 'public_project/favor',
      payload: id,
      institutionId: this.props.institutionId,
      callback: this.props.afterFavor,
    });
  };

  render() {
    const { style, data, showTopBorder, in_individual } = this.props;
    if (!in_individual) {
      return <PublicProjectItem data={data} onPress={this.handlePress} />;
    }
    const icon = R.pathOr('', ['icon'])(data);
    const project_name = R.pathOr('--', ['name'])(data);
    const status = R.pathOr('', ['finance_status'])(data);
    const category = R.pathOr([], ['tags'])(data);
    const description = R.pathOr('--', ['description'])(data);
    const stars = R.pathOr(0, ['stars'])(data);
    const favored = R.pathOr(false, ['is_focused'])(data);

    // misc
    const has_white_paper = R.pathOr(false, ['has_white_paper'])(data);
    const is_vip = R.pathOr(false, ['is_vip'])(data);
    const invested_by_renowned_insti = R.pathOr(false, [
      'is_renowned_industry',
    ])(data);
    const top_rated = R.pathOr(false, ['has_rating'])(data);
    const is_reachable = R.pathOr(false, ['is_reachable'])(data);
    const has_owner = R.pathOr(false, ['is_owned'])(data);
    const has_weekly = R.pathOr(false, ['has_weekly'])(data);

    return (
      <Touchable foreground onPress={this.handlePress}>
        <View
          style={[styles.container, showTopBorder && styles.topBorder, style]}
        >
          <View>
            <Avatar
              style={styles.avatar}
              raised={false}
              size={52}
              innerRatio={0.75}
              source={
                R.isEmpty(icon)
                  ? require('asset/project/project_logo_default.png')
                  : { uri: icon }
              }
            />
            {!!is_vip && (
              <View style={styles.vip_label}>
                <Image source={require('asset/public_project/vip_label.png')} />
              </View>
            )}
          </View>
          <View style={styles.content.container}>
            <View style={styles.content.titleContainer}>
              <Text style={styles.content.title}>{project_name}</Text>
              {!!has_owner && (
                <Flex style={{ marginLeft: 12 }} align="center">
                  <Image
                    style={{ marginRight: 4 }}
                    source={require('asset/public_project/claimed_icon.png')}
                  />
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#1890FF', fontWeight: 'bold' },
                    ]}
                  >
                    已入驻
                  </Text>
                </Flex>
              )}
            </View>
            <View style={styles.content.tag.wrapper}>
              {R.pipe(
                R.take(4),
                R.addIndex(R.map)((t, i) => (
                  <View key={`${i}`} style={styles.content.tag.container}>
                    <Text style={styles.content.tag.title}>
                      {R.pipe(
                        R.pathOr('', ['name']),
                        R.trim,
                      )(t)}
                    </Text>
                  </View>
                )),
              )(category)}
            </View>
            <View
              style={[
                styles.content.miscTag.container,
                R.isEmpty(category) && { marginTop: 0 },
              ]}
            >
              {!!has_white_paper && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#E5F3FF', marginRight: 4 },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#1890FF' },
                    ]}
                  >
                    有白皮书
                  </Text>
                </View>
              )}
              {!!invested_by_renowned_insti && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#E5F3FF', marginRight: 4 },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#1890FF' },
                    ]}
                  >
                    知名机构所投
                  </Text>
                </View>
              )}
              {!!top_rated && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#E5F3FF', marginRight: 4 },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#1890FF' },
                    ]}
                  >
                    有评级
                  </Text>
                </View>
              )}
              {!!is_reachable && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#E5F3FF', marginRight: 4 },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#1890FF' },
                    ]}
                  >
                    可联系
                  </Text>
                </View>
              )}
              {!!has_weekly && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#E5F3FF' },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#1890FF' },
                    ]}
                  >
                    有周报
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.content.subtitle]} numberOfLines={1}>
              {description}
            </Text>
          </View>
          <View style={styles.end.container}>
            <View style={{ flex: 1 }}>
              {!R.isEmpty(status) && !R.equals(status, '未设定') && (
                <Text
                  style={[
                    styles.end.status,
                    status === '进行中' && { color: '#09AC32' },
                    status === '已结束' && { color: 'rgba(0, 0, 0, 0.25)' },
                  ]}
                >
                  {status}
                </Text>
              )}
            </View>
            <Touchable foreground onPress={this.handleFavorPress}>
              <View
                style={[
                  styles.end.favor.container,
                  R.isEmpty(status) && { marginTop: 0 },
                ]}
              >
                <Image
                  source={
                    favored
                      ? require('asset/favored/favored_star.png')
                      : require('asset/favored/unfavored_star.png')
                  }
                />
                <Text style={styles.end.favor.number}>
                  {'  '}
                  {stars}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#F0F0F0',
    borderRadius: 2,
  },
  vip_label: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, 0.25)',
      },
      title: {
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    miscTag: {
      container: {
        marginTop: 8,
        flexDirection: 'row',
      },
      item: {
        container: {
          height: 17,
          paddingHorizontal: 3,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 1,
        },
        text: {
          fontSize: 10,
        },
      },
    },
  },
  end: {
    container: {
      marginVertical: 3,
      alignItems: 'flex-end',
      marginLeft: 6,
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1890FF',
    },
    favor: {
      container: {
        // marginTop: 24,
        paddingHorizontal: 12,
        height: 24,
        maxWidth: 60,
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#DDDDDD',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      number: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
  topBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E9E9E9',
  },
};

export default FavorItem;
