import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { View, Text, ViewPropTypes } from 'react-native';
import { VictoryLine } from 'victory-native';
import NodeCapIcon from 'component/icon/nodecap';

const investNumber = ({ style, data = {} }) => {
  const trend = R.pathOr([], ['trend'])(data);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left.container}>
        <View>
          <Text style={styles.left.title}>{data.count || '暂无'}</Text>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <Text style={styles.left.subtitle}>
              本周{'  '}
              {data.week}{' '}
              {data.week > 0 && (
                <NodeCapIcon name="shangsheng" color="#09AC32" />
              )}
              {'     '}
              本月{'  '}
              {data.month}{' '}
              {data.month > 0 && (
                <NodeCapIcon name="shangsheng" color="#09AC32" />
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.right.container}>
        {R.length(trend) > 1 && (
          <VictoryLine
            style={{
              data: {
                stroke: '#35C3FF',
              },
            }}
            interpolation="basis"
            data={trend}
            x="dateTime"
            y="count"
            width={120}
            height={80}
            padding={0}
          />
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    height: 123,
    paddingHorizontal: 22,
  },
  left: {
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      color: '#333333',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 14,
      color: '#333333',
    },
  },
  right: {
    container: {
      justifyContent: 'center',
    },
  },
};

investNumber.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
};

export default investNumber;
