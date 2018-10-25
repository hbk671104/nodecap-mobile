import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const publicProjectItem = ({ style, data, onPress }) => {
  const icon = R.pathOr('', ['icon'])(data);
  const project_name = R.pathOr('--', ['name'])(data);
  const status = R.pathOr('', ['finance_status'])(data);
  const category = R.pipe(
    R.pathOr([], ['tags']),
    R.take(4),
  )(data);
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
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
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
          <View style={styles.content.top.container}>
            <View style={styles.content.titleContainer}>
              <Text style={styles.content.top.title.text} numberOfLines={2}>
                {project_name}
              </Text>
              {is_vip && (
                <Image
                  style={{ marginLeft: 8 }}
                  source={require('asset/public_project/is_vip.png')}
                />
              )}
            </View>
            {!R.isEmpty(status) &&
              !R.equals(status, '未设定') && (
                <Text
                  style={[
                    styles.content.top.status,
                    status === '进行中' && { color: '#09AC32' },
                    status === '已结束' && { color: 'rgba(0, 0, 0, 0.45)' },
                  ]}
                >
                  {status}
                </Text>
              )}
          </View>
          <View style={styles.content.tag.wrapper}>
            {R.addIndex(R.map)((t, i) => (
              <View key={`${i}`} style={styles.content.tag.container}>
                <Text style={styles.content.tag.title}>
                  {R.pipe(
                    R.pathOr('', ['name']),
                    R.trim,
                  )(t)}
                </Text>
              </View>
            ))(category)}
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
                  评级优秀
                </Text>
              </View>
            )}
          </View>
          <View
            style={[
              styles.content.subtitle.container,
              (R.isEmpty(category) ||
                (!has_white_paper &&
                  !invested_by_renowned_insti &&
                  !top_rated)) && { marginTop: 0 },
            ]}
          >
            <Text numberOfLines={2} style={styles.content.subtitle.text}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#F0F0F0',
    borderRadius: 2,
  },
  content: {
    container: {
      marginLeft: 15,
      flex: 1,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    top: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        container: {
          flex: 1,
        },
        text: {
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      status: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1890FF',
      },
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
          marginRight: 4,
        },
        text: {
          fontSize: 10,
        },
      },
    },
    subtitle: {
      container: {
        marginTop: 8,
      },
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
};

publicProjectItem.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

publicProjectItem.defaultProps = {
  onPress: () => null,
};

export default publicProjectItem;
