import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card } from 'react-native-elements';
import * as R from 'ramda';
import Shimmer from 'react-native-shimmer';
import Text from 'component/text';

import NodeCapIcon from 'component/icon/nodecap';

const arrow = (profit) => {
  if (profit > 0) {
    return <NodeCapIcon name="shangsheng" color="#09AC32" />;
  }
  return <NodeCapIcon name="xiala1" color="#F5222D" />;
};

const symbol = (b, size = 22) => {
  switch (b) {
    case 'USD':
      return <NodeCapIcon name="tubiaozhizuomoban" size={size} />;
    case 'CNY':
      return <NodeCapIcon name="icomoon" size={size} />;
    default:
      return <NodeCapIcon name={b} size={size} />;
  }
};

const profitSwiper = ({ style, total, daily, weekly }) => {
  return (
    <View style={[styles.container, style]}>
      <Swiper
        style={{ zIndex: 15 }}
        height={100}
        autoplay
        autoplayTimeout={10}
        activeDotColor="#1890FF"
        paginationStyle={{ bottom: -20 }}
      >
        {R.keys(total).map((b) => {
          const totalProfit = R.path([b])(total);
          const dailyProfit = R.path([b, 'count'])(daily);
          const weeklyProfit = R.path([b, 'count'])(weekly);
          return (
            <Card key={b} containerStyle={styles.card}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.label}>浮动盈亏</Text>
                <View style={styles.content.container}>
                  <Shimmer opacity={0.8}>
                    <Text style={[styles.content.gain, totalProfit < 0 && styles.content.lost]}>
                      {symbol(b)} <Text>{totalProfit}</Text>{' '}
                      <Text style={styles.content.label}>{b}</Text>
                    </Text>
                  </Shimmer>
                </View>
                <View style={styles.sub.container}>
                  <Text style={styles.sub.text}>
                    {symbol(b, 12)} <Text>{dailyProfit}</Text> {'今日'} {arrow(dailyProfit)}
                    {'     '}
                    {symbol(b, 12)} <Text>{weeklyProfit}</Text> {'本周'} {arrow(weeklyProfit)}
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: -48,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  card: {
    margin: 0,
    height: 96,
    marginHorizontal: 27.5,
    borderRadius: 2,
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  label: {
    fontSize: 13,
    color: '#999999',
  },
  content: {
    container: {
      marginTop: 10,
    },
    gain: {
      fontSize: 24,
      color: '#09AC32',
      fontWeight: 'bold',
    },
    lost: {
      color: '#F5222D',
    },
    label: {
      fontSize: 13,
      color: '#666666',
    },
  },
  sub: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    text: {
      fontSize: 13,
      color: '#666666',
    },
  },
};

profitSwiper.propTypes = {
  style: ViewPropTypes.style,
  total: PropTypes.object,
  daily: PropTypes.object,
  weekly: PropTypes.object,
};

export default profitSwiper;
