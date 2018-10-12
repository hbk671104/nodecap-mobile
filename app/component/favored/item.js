import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import PublicProjectItem from 'component/public_project/item';
import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

const colorMap = [
  {
    textColor: '#1890FF',
    backgroundColor: '#E5F3FF',
  },
  {
    textColor: '#FF7600',
    backgroundColor: '#FFE9D6',
  },
  {
    textColor: '#A663E0',
    backgroundColor: '#ECD7FE',
  },
  {
    textColor: '#09AC32',
    backgroundColor: '#BCF4CA',
  },
];

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
    return (
      <Touchable foreground onPress={this.handlePress}>
        <View
          style={[styles.container, showTopBorder && styles.topBorder, style]}
        >
          <Avatar
            size={45}
            source={
              R.isEmpty(icon)
                ? require('asset/project/project_logo_default.png')
                : { uri: icon }
            }
          />
          <View style={styles.content.container}>
            <Text style={styles.content.title}>{project_name}</Text>
            <View style={styles.content.tag.wrapper}>
              {R.pipe(
                R.take(2),
                // R.filter(t => !R.isEmpty(R.trim(t))),
                R.addIndex(R.map)((t, i) => {
                  const textColor = R.pathOr('#939393', [i, 'textColor'])(
                    colorMap,
                  );
                  const backgroundColor = R.pathOr('#E2E2E2', [
                    i,
                    'backgroundColor',
                  ])(colorMap);
                  return (
                    <View
                      key={`${i}`}
                      style={[
                        styles.content.tag.container,
                        { backgroundColor },
                      ]}
                    >
                      <Text
                        style={[styles.content.tag.title, { color: textColor }]}
                      >
                        {R.pipe(
                          R.pathOr('', ['name']),
                          R.trim,
                        )(t)}
                      </Text>
                    </View>
                  );
                }),
              )(category)}
            </View>
            <Text
              style={[
                styles.content.subtitle,
                R.isEmpty(category) && { marginTop: 0 },
              ]}
              numberOfLines={1}
            >
              {description}
            </Text>
          </View>
          <View style={styles.end.container}>
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

export const itemHeight = 90;
const styles = {
  container: {
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
    tag: {
      wrapper: {
        marginTop: 8,
        flexDirection: 'row',
      },
      container: {
        height: 19,
        paddingHorizontal: 3,
        borderRadius: 2,
        marginRight: 8,
        justifyContent: 'center',
      },
      title: {
        fontSize: 11,
      },
    },
  },
  end: {
    container: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginLeft: 6,
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1890FF',
    },
    favor: {
      container: {
        marginTop: 8,
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
