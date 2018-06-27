import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as R from 'ramda';
import Accounting from 'accounting';

import NodeCapIcon from 'component/icon/nodecap';

const header = (props) => {
  const projectProps = path => R.path(['item', ...path])(props);
  const statProps = path => R.path(['stat', ...path])(props);

  const price = statProps(['price', 'CNY']);
  const cost = statProps(['cost', 'CNY']);
  const ratio = (price / cost).toFixed(1);
  const change24h = statProps(['degree']);
  const roi = statProps(['ROI', 'CNY', 'count']);
  const vol24h = statProps(['vol', 'CNY']);
  const peak24h = statProps(['high', 'CNY']);

  return (
    <View style={styles.container}>
      <View style={styles.top.container}>
        <Text style={styles.top.title}>{projectProps(['name'])}</Text>
        {/* <TouchableOpacity style={styles.top.switch.container}>
          <Text style={styles.top.switch.title}>
            火币 <NodeCapIcon name="xiala" />
          </Text>
          <Text style={styles.top.switch.subtitle}>支持切换 Top10 交易所及交易对</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.price.container}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={styles.price.text}>
            ￥{Accounting.formatNumber(price, 2)}
            <Text style={styles.price.label}> CNY</Text>
          </Text>
          <View style={styles.price.roi.container}>
            <Text style={styles.price.roi.text}>{ratio} 倍</Text>
          </View>
        </View>
        <Text style={styles.price.cost}>成本价：￥{Accounting.formatNumber(cost, 2)}</Text>
      </View>
      <View style={styles.middle.container}>
        <View style={styles.middle.top.container}>
          <View style={{ flex: 2 }}>
            <Text style={[styles.middle.top.text, change24h < 0 && { color: '#F5222D' }]}>
              {Accounting.formatNumber(change24h, 2)}%
            </Text>
            <Text style={styles.middle.top.label}>今日涨跌</Text>
          </View>
          <View style={styles.middle.top.divider} />
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.middle.top.text}>{Accounting.formatNumber(roi)}%</Text>
            <Text style={styles.middle.top.label}>投资回报率</Text>
          </View>
          <View style={styles.middle.top.divider} />
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={[styles.middle.top.text, { color: '#666666' }]}>#3</Text>
            <Text style={styles.middle.top.label}>投资回报率排名</Text>
          </View>
        </View>
        <View style={styles.middle.bottom.container}>
          {/* <Text style={styles.middle.bottom.text}>
            量(24H) {vol24h} SOC | 额(24H) 30.23亿CNY | 最高(24H) ¥{peak24h}CNY
          </Text> */}
          <Text style={styles.middle.bottom.text}>
            量(24H) {Accounting.formatNumber(vol24h)} SOC | 最高(24H) ¥{Accounting.formatNumber(
              peak24h,
              2
            )}{' '}
            CNY
          </Text>
        </View>
      </View>
      {/* <View style={styles.bottom.container}>
        <Text style={styles.bottom.title}>已上交易所</Text>
        <Text style={styles.bottom.content}>Bitfinex | Okex | Huobi | Bithumb</Text>
      </View> */}
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  top: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: '#333333',
      fontSize: 20,
      fontWeight: 'bold',
    },
    switch: {
      container: {
        alignItems: 'flex-end',
      },
      title: {
        color: '#333333',
        fontSize: 12,
        fontWeight: 'bold',
      },
      subtitle: {
        color: '#999999',
        fontSize: 10,
        marginTop: 3,
      },
    },
  },
  price: {
    container: {
      marginTop: 10,
    },
    text: {
      color: '#09AC32',
      fontSize: 30,
      fontWeight: 'bold',
    },
    label: {
      fontSize: 14,
    },
    roi: {
      container: {
        marginLeft: 8,
        marginBottom: 5,
        height: 20,
        borderRadius: 4,
        paddingHorizontal: 5,
        backgroundColor: '#09AC32',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 11,
        color: 'white',
      },
    },
    cost: {
      color: '#999999',
      fontSize: 12,
      marginTop: 8,
    },
  },
  middle: {
    container: {
      marginTop: 20,
    },
    top: {
      container: {
        flexDirection: 'row',
      },
      text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#09AC32',
      },
      label: {
        fontSize: 12,
        color: '#999999',
        marginTop: 5,
      },
      divider: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#E9E9E9',
      },
    },
    bottom: {
      container: {
        marginTop: 14,
      },
      text: {
        fontSize: 10,
        color: '#999999',
      },
    },
  },
  bottom: {
    container: {
      marginTop: 15,
    },
    title: {
      color: '#999999',
      fontSize: 10,
    },
    content: {
      color: '#1890FF',
      fontSize: 14,
      marginTop: 5,
    },
  },
};

export default header;
