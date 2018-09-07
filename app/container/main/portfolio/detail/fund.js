import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import Price from 'component/price';
import Percentage from 'component/percentage';
import PlaceHolder from 'component/loading_placeholder';

import { symbol } from '../../../../utils/icon';

const fund = props => {
  const fund_stats = R.pathOr([], ['portfolio', 'fund_stats'])(props);
  return (
    <PlaceHolder
      style={styles.placeholder}
      onReady={!props.stat_loading && R.not(R.isEmpty(fund_stats))}
      animate="shine"
    >
      <View style={styles.container}>
        {R.map(f => {
          const quote = R.path(['quote'])(f);
          const name = R.pathOr('--', ['name'])(f);
          const unit_cost = R.pathOr('--', ['unit_cost', quote])(f);
          const roi = R.pathOr('--', ['roi', quote, 'value'])(f);

          return (
            <View key={f.id} style={styles.item.container}>
              <Text style={styles.item.title}>{name}</Text>
              <View style={styles.item.bottom.container}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.item.bottom.label}>
                    成本价
                    {'   '}
                    {symbol(quote, styles.item.bottom.label)}
                    <Price symbol={quote}>{unit_cost}</Price>
                  </Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={styles.item.bottom.label}>
                    回报率
                    {'   '}
                    <Percentage>{roi}</Percentage>
                  </Text>
                </View>
              </View>
            </View>
          );
        })(fund_stats)}
      </View>
    </PlaceHolder>
  );
};

const styles = {
  placeholder: {
    height: 100,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  container: {
    marginBottom: 12,
  },
  item: {
    container: {
      height: 50,
      justifyContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: 12,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
    bottom: {
      container: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
      price: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
};

export default fund;
