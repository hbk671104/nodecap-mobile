import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

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
          item: this.props.data,
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
    const has_white_paper = R.pipe(
      R.pathOr([], ['white_papers']),
      R.isEmpty,
      R.not,
    )(data);
    const is_vip = R.pipe(
      R.pathOr({}, ['vip']),
      R.isEmpty,
      R.not,
    )(data);
    const invested_by_renowned_insti = R.pipe(
      R.pathOr([], ['renowned_industry']),
      R.isEmpty,
      R.not,
    )(data);
    const top_rated = R.pipe(
      R.pathOr([], ['top_rating']),
      R.isEmpty,
      R.not,
    )(data);
    const is_reachable = R.pipe(
      R.pathOr([], ['is_reachable']),
      R.isEmpty,
      R.not,
    )(data);

    return (
      <Touchable foreground onPress={this.handlePress}>
        <View
          style={[styles.container, showTopBorder && styles.topBorder, style]}
        >
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
          <View style={styles.content.container}>
            <View style={styles.content.titleContainer}>
              <Text style={styles.content.title}>{project_name}</Text>
              {is_vip && (
                <Image
                  style={{ marginLeft: 8 }}
                  source={require('asset/public_project/is_vip.png')}
                />
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
              {has_white_paper && (
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
              {invested_by_renowned_insti && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#FFE9D6', marginRight: 4 },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#FF7600' },
                    ]}
                  >
                    知名机构所投
                  </Text>
                </View>
              )}
              {top_rated && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#BCF4CA' },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#09AC32' },
                    ]}
                  >
                    有评级
                  </Text>
                </View>
              )}
              {is_reachable && (
                <View
                  style={[
                    styles.content.miscTag.item.container,
                    { backgroundColor: '#ECD7FE' },
                  ]}
                >
                  <Text
                    style={[
                      styles.content.miscTag.item.text,
                      { color: '#A663E0' },
                    ]}
                  >
                    可联系
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
              {!R.isEmpty(status) &&
                !R.equals(status, '未设定') && (
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
    padding: 12,
    backgroundColor: 'white',
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#F0F0F0',
    borderRadius: 2,
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
          justifyContent: 'center',
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
