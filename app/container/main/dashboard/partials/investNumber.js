import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { View, Text, ViewPropTypes } from 'react-native';

import NodeCapIcon from 'component/icon/nodecap';

export const textList = ({ roiRank, onItemPress }) => {
  return (
    <Text>
      {roiRank.map((r, i) => (
        <Text key={r.id}>
          {i !== 0 && <Text style={styles.bottom.content.divider}> | </Text>}
          <Text style={styles.bottom.content.text} onPress={onItemPress(r)}>
            {r.name}
          </Text>
        </Text>
      ))}
    </Text>
  );
};

const investNumber = ({ style, data, roiRank, onItemPress }) => {
  const roiCount = R.length(roiRank);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.top.container}>
        <View style={styles.top.left.container}>
          <Text style={styles.top.left.title}>{data.count || '暂无'}</Text>
          <Text style={styles.top.left.subtitle}>当前投资项目</Text>
        </View>
        <View style={styles.top.right.container}>
          <View style={styles.top.right.group.container}>
            <Text style={styles.top.right.group.title}>
              {data.week}
              {'  '}
              {data.week > 0 && (
                <NodeCapIcon name="shangsheng" color="#09AC32" />
              )}
            </Text>
            <Text style={styles.top.right.group.subtitle}>本周</Text>
          </View>
          <View style={styles.top.right.group.container}>
            <Text style={styles.top.right.group.title}>
              {data.month}
              {'   '}
              {data.month > 0 && (
                <NodeCapIcon name="shangsheng" color="#09AC32" />
              )}
            </Text>
            <Text style={styles.top.right.group.subtitle}>本月</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom.container}>
        <View>
          <Text style={styles.bottom.title}>已上交易所项目 ({roiCount})</Text>
          <Text style={styles.bottom.subtitle}>
            当前基金收益统计所包含的项目
          </Text>
        </View>
        <View style={styles.bottom.content.container}>
          {textList({ roiRank, onItemPress })}
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  top: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    left: {
      container: {},
      title: {
        fontSize: 30,
        color: '#1890FF',
        fontWeight: 'bold',
      },
      subtitle: {
        fontSize: 12,
        color: '#999999',
        marginTop: 11,
      },
    },
    right: {
      container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
      group: {
        container: {
          alignItems: 'flex-end',
          marginLeft: 30,
        },
        title: {
          color: '#333333',
          fontSize: 14,
        },
        subtitle: {
          color: '#666666',
          fontSize: 12,
          marginTop: 8.5,
        },
      },
    },
  },
  bottom: {
    container: {
      marginTop: 22.5,
    },
    title: {
      color: '#333333',
      fontSize: 16,
    },
    subtitle: {
      color: '#999999',
      fontSize: 11,
      marginTop: 10,
    },
    content: {
      container: {
        marginTop: 12.5,
      },
      text: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#1890FF',
        lineHeight: 23,
      },
      divider: {
        color: '#999999',
        fontSize: 12,
        fontWeight: '100',
        lineHeight: 23,
      },
    },
  },
};

investNumber.defaultProps = {
  data: {},
  roiRank: [],
  onItemPress: () => null,
};

investNumber.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
  roiRank: PropTypes.array,
  onItemPress: PropTypes.func,
};

export default investNumber;
