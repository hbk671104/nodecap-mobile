import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import PublicProjectItem from 'component/public_project/item';
import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

class LargeFavorItem extends PureComponent {
  static propType = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { style, data, showTopBorder } = this.props;

    const icon = R.pathOr('', ['icon'])(data);
    const project_name = R.pathOr('--', ['name'])(data);
    const category = R.pathOr([], ['tags'])(data);
    const description = R.pathOr('--', ['description'])(data);

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

    return (
      <Touchable foreground onPress={this.handlePress}>
        <View
          style={[styles.container, showTopBorder && styles.topBorder, style]}
        >
          <Avatar
            style={styles.avatar}
            raised={false}
            size={67.5}
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
            <View style={styles.content.miscTag.container}>
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
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F9F9F9',
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#F0F0F0',
    borderRadius: 2,
  },
  content: {
    container: {
      marginLeft: 35.5,
      marginRight: 20,
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
        backgroundColor: 'white',
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

export default LargeFavorItem;
