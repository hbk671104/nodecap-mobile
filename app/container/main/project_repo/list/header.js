import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const header = ({ params, onSelect, onFilterPress }) => {
  const is_reachable = R.pathOr(0, ['is_reachable'])(params);
  const has_weekly = R.pathOr(0, ['has_weekly'])(params);
  const has_rating = R.pathOr(0, ['has_rating'])(params);
  const has_white_paper = R.pathOr(0, ['has_white_paper'])(params);
  const is_renowned_industry = R.pathOr(0, ['is_renowned_industry'])(params);

  const has_filter =
    !R.isEmpty(params.progress) ||
    !R.isEmpty(params.industry_id) ||
    !R.isEmpty(params.tag_id) ||
    !R.isEmpty(params.region_id) ||
    !R.isEmpty(params.purpose_id) ||
    is_reachable !== 0 ||
    has_weekly !== 0 ||
    has_rating !== 0 ||
    has_white_paper !== 0 ||
    is_renowned_industry !== 0;
  return (
    <View style={styles.container}>
      <View style={styles.content.container}>
        {/* <Text style={styles.content.title}>
          当前：
          <Text style={{ fontWeight: 'bold', color: '#1890FF' }}>{count}</Text>
        </Text> */}
        <View style={styles.content.tag.container}>
          <Touchable
            style={[
              styles.content.tag.wrapper,
              is_reachable === 1 && styles.content.tag.highlight,
            ]}
            onPress={() =>
              onSelect({
                value: is_reachable === 0 ? 1 : 0,
                key: 'is_reachable',
                name: '即将开始',
              })
            }
          >
            <Text
              style={[
                styles.content.tag.title,
                is_reachable === 1 && styles.content.tag.titleHighlight,
              ]}
            >
              可联系
            </Text>
          </Touchable>
          <Touchable
            style={[
              styles.content.tag.wrapper,
              has_rating === 1 && styles.content.tag.highlight,
            ]}
            onPress={() =>
              onSelect({
                value: has_rating === 0 ? 1 : 0,
                key: 'has_rating',
                name: '有评级',
              })
            }
          >
            <Text
              style={[
                styles.content.tag.title,
                has_rating === 1 && styles.content.tag.titleHighlight,
              ]}
            >
              有评级
            </Text>
          </Touchable>
          <Touchable
            style={[
              styles.content.tag.wrapper,
              is_renowned_industry === 1 && styles.content.tag.highlight,
            ]}
            onPress={() =>
              onSelect({
                value: is_renowned_industry === 0 ? 1 : 0,
                key: 'is_renowned_industry',
                name: '知名机构所投',
              })
            }
          >
            <Text
              style={[
                styles.content.tag.title,
                is_renowned_industry === 1 && styles.content.tag.titleHighlight,
              ]}
            >
              知名机构所投
            </Text>
          </Touchable>
          <Touchable
            style={[
              styles.content.tag.wrapper,
              has_weekly === 1 && styles.content.tag.highlight,
            ]}
            onPress={() =>
              onSelect({
                value: has_weekly === 0 ? 1 : 0,
                key: 'has_weekly',
                name: '有周报',
              })
            }
          >
            <Text
              style={[
                styles.content.tag.title,
                has_weekly === 1 && styles.content.tag.titleHighlight,
              ]}
            >
              有周报
            </Text>
          </Touchable>
        </View>
      </View>
      <Touchable
        borderless
        style={styles.filter.container}
        onPress={onFilterPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={
              has_filter
                ? require('asset/public_project/funnel_highlight.png')
                : require('asset/public_project/funnel.png')
            }
          />
          <Text
            style={[styles.filter.title, has_filter && { color: '#1890FF' }]}
          >
            筛选
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = {
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  content: {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      width: 72,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    tag: {
      container: {
        flexDirection: 'row',
      },
      wrapper: {
        borderRadius: 2,
        height: 28.5,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginRight: 10,
      },
      highlight: {
        backgroundColor: '#E5F3FF',
      },
      title: {
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.65)',
      },
      titleHighlight: {
        color: '#1890FF',
        fontWeight: 'bold',
      },
    },
  },
  filter: {
    container: {
      marginLeft: 12,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
      marginLeft: 3,
    },
  },
};

export default header;
