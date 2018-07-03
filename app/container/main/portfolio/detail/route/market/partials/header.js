import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as R from 'ramda';
import Accounting from 'accounting';

import Price from 'component/price';
import NodeCapIcon from 'component/icon/nodecap';
import { symbol } from '../../../../../../../utils/icon';

const headers = (props) => {
  const projectProps = path => R.path(['item', ...path])(props);
  const statProps = path => R.path(['stat', ...path])(props);

  const baseSym = R.pipe(
    R.pathOr('', ['currentSymbol', 'symbol']),
    R.split('/')
  )(props)[0];
  const currentSym = R.pipe(
    R.pathOr('', ['currentSymbol', 'symbol']),
    R.split('/'),
    R.last
  )(props);
  const currentMarket = R.path(['currentSymbol', 'market'])(props);
  const market = R.pipe(
    R.pathOr([], ['symbols']),
    R.map(s => s.market),
    R.uniq
  )(props);

  const price = statProps(['current_price', currentSym]);
  const cost = statProps(['investment', 'unit_cost', currentSym]);
  const ratio = (price / cost).toFixed(1);
  const change24h = statProps(['price_change_percentage_24h']);
  const roi = statProps(['investment', 'roi', currentSym, 'value']);
  const vol24h = statProps(['total_volume', currentSym]);
  const amount24h = statProps(['total_volume', baseSym]);
  const peak24h = statProps(['high_24h', currentSym]);

  return (
    <View style={styles.container}>
      <View style={styles.top.container}>
        <Text style={styles.top.title}>{projectProps(['name'])}</Text>
        <TouchableOpacity style={styles.top.switch.container} onPress={props.toggle}>
          <Text style={styles.top.switch.title}>
            {currentMarket} <NodeCapIcon name="xiala" />
          </Text>
          <Text style={styles.top.switch.subtitle}>支持 Top10 交易所及第三方数据源</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.price.container}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={styles.price.text}>
            {symbol(currentSym, styles.price.text)} <Price symbol={currentSym}>{price}</Price>
            <Text style={styles.price.label}> {currentSym}</Text>
          </Text>
          <View style={styles.price.roi.container}>
            <Text style={styles.price.roi.text}>{ratio} 倍</Text>
          </View>
        </View>
        <Text style={styles.price.cost}>
          成本价：{symbol(currentSym, styles.price.cost)} <Price symbol={currentSym}>{cost}</Price>
        </Text>
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
          <Text style={styles.middle.bottom.text}>
            量(24H) {Accounting.formatNumber(amount24h)} {baseSym} | 额(24H){' '}
            {Accounting.formatNumber(vol24h)} {currentSym} | 最高(24H){' '}
            <Price symbol={currentSym}>{peak24h}</Price> {currentSym}
          </Text>
        </View>
      </View>
      <View style={styles.bottom.container}>
        <Text style={styles.bottom.title}>已上交易所</Text>
        <Text style={styles.bottom.content}>{market.join('|')}</Text>
      </View>
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

export default headers;
