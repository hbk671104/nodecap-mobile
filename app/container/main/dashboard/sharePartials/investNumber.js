import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { View, Text, ViewPropTypes } from 'react-native';
import { Flex } from 'antd-mobile';
import { mainColor } from 'component/uikit/color';
import { VictoryLine } from 'victory-native';
import NodeCapIcon from 'component/icon/nodecap';

const investNumber = ({ style, data = {} }) => {
  const trend = R.pathOr([], ['trend'])(data);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left.container}>
        <Flex justify="space-between">
          <View>
            <Text style={styles.left.title}>{data.count || '暂无'}</Text>
            <Text style={styles.left.subtitle}>当前投资项目</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <View style={styles.ml}>
              <Text>
                {data.week} {data.week > 0 && <NodeCapIcon name="shangsheng" color="#09AC32" />}
              </Text>
              <Text style={styles.left.subtitle}>本周</Text>
            </View>
            <View style={styles.ml}>
              <Text>
                {data.month} {data.month > 0 && <NodeCapIcon name="shangsheng" color="#09AC32" />}
              </Text>
              <Text style={styles.left.subtitle}>本月</Text>
            </View>
          </View>
        </Flex>
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
      color: mainColor,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      color: '#999',
      marginTop: 5,
    },
  },
  right: {
    container: {
      justifyContent: 'center',
    },
  },
  ml: {
    marginLeft: 30,
  },
};

investNumber.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
};

export default investNumber;
